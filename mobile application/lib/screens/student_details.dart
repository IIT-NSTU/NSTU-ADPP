import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ndpp/constants/const.dart';
import '../screens/dashboard.dart';
import '../models/Userdata.dart';

// ignore: must_be_immutable
class StudentDetails extends StatefulWidget {
  Map data;
  StudentDetails(this.data, {Key? key}) : super(key: key);

  @override
  State<StudentDetails> createState() => _StudentDetailsState();
}

class _StudentDetailsState extends State<StudentDetails> {
  var data;

  Future<void> getUserApi() async {
    if (UserData.Userdata!['user']['is_chairman'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-chairman/')),
      ]);
      var response1 = response.first;

      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
      } else {
        print('No Response-1');
      }
    }
    if (UserData.Userdata!['user']['is_provost'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-provost/')),
      ]);
      var response1 = response.first;

      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
      } else {
        print('No Response-1');
      }
    }
    if (UserData.Userdata!['user']['is_librarian'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-librarian/')),
      ]);
      var response1 = response.first;

      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
      } else {
        print('No Response-1');
      }
    }
    if (UserData.Userdata!['user']['is_examController'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-examController/')),
      ]);
      var response1 = response.first;

      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
      } else {
        print('No Response-1');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Student Details', style: boldText),
          centerTitle: true,
        ),
        body: Center(
            child: Container(
          padding: const EdgeInsets.all(20),
          child: ListView(children: [
            Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)),
              elevation: 10,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Text('Student Details', style: boldText),
                  ),
                  Row(
                    children: [
                      textStyle1("Student Name"),
                      textStyle2(
                          widget.data['student_details']['email'].toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("Student ID"),
                      textStyle2(
                          widget.data['student_details']['name'].toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("Student Department"),
                      textStyle2(widget.data['student_details']['department']
                          .toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("Student Session"),
                      textStyle2(
                          widget.data['student_details']['session'].toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("Passing Year"),
                      textStyle2(widget.data['student_details']['passing_year']
                          .toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("CGPA"),
                      textStyle2(widget.data['result']['cgpa'].toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("Total Credit Completed"),
                      textStyle2(widget.data['result']['total_credit_completed']
                          .toString()),
                    ],
                  ),
                  Row(
                    children: [
                      textStyle1("SSC Certificate"),
                      createButton('View', context, widget.data, Colors.blue),
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)),
              elevation: 10,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Text('Status Details', style: boldText),
                  ),
                  FutureBuilder(
                      future: getUserApi(),
                      builder: ((context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return const Text("Wait data loading");
                        } else {
                          return statusTable(data);
                        }
                      }))
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                createButton('Accept', context, widget.data, Colors.green),
                SizedBox(width: (MediaQuery.of(context).size.width) * .1),
                createButton('Reject', context, widget.data, Colors.red),
              ],
            )
          ]),
        )));
  }

  textStyle1(String s) {
    return Container(
      width: (MediaQuery.of(context).size.width) * .4,
      padding: const EdgeInsets.all(20.0),
      child: Text(
        s,
        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
      ),
    );
  }

  textStyle2(String s) {
    return Container(
      width: (MediaQuery.of(context).size.width / 2) - 40,
      padding: const EdgeInsets.all(20.0),
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
            border: Border.all(), borderRadius: BorderRadius.circular(8)),
        child: Text(
          s,
        ),
      ),
    );
  }
}

Widget statusTable(var data) {
  return DataTable(
    //  columnSpacing: (MediaQuery.of(context).size.width / 5),
    columns: const [
      DataColumn(
        label: Text(
          'Authority',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      DataColumn(
          label: Text(
        'Action Date',
        style: TextStyle(fontWeight: FontWeight.bold),
      )),
      DataColumn(
          label: Text(
        'Status',
        style: TextStyle(fontWeight: FontWeight.bold),
      ))
    ],
    rows: [
      DataRow(cells: [
        const DataCell(Text('Chairman')),
        DataCell(data[0]['chairman_status'] == null
            ? const Text("Pending")
            : Text(data[0]['chairman_action_date'].toString())),
        DataCell(data[0]['chairman_action_date'] == null
            ? Container(
                alignment: Alignment.center,
                child: const Icon(Icons.pending, color: Colors.yellow))
            : Container(
                alignment: Alignment.center,
                child: const Icon(Icons.done, color: Colors.green))),
      ]),
      DataRow(cells: [
        const DataCell(Text('Hall Provost')),
        DataCell(data[0]['provost_status'] == null
            ? const Text("Pending")
            : Text(data[0]['provost_action_date'].toString())),
        DataCell(data[0]['provost_action_date'] == null
            ? const Icon(Icons.pending, color: Colors.yellow)
            : const Icon(Icons.done, color: Colors.green)),
      ]),
      DataRow(cells: [
        const DataCell(Text('Librarian')),
        DataCell(data[0]['librarian_status'] == null
            ? const Text("Pending")
            : Text(data[0]['librarian_action_date'].toString())),
        DataCell(data[0]['librarian_action_date'] == null
            ? const Icon(Icons.pending, color: Colors.yellow)
            : const Icon(Icons.done, color: Colors.green)),
      ]),
      DataRow(cells: [
        const DataCell(Text('Exam Controller')),
        DataCell(data[0]['examController_status'] == null
            ? const Text("Pending")
            : Text(data[0]['examController_action_date'].toString())),
        DataCell(data[0]['examController_action_date'] == null
            ? const Icon(Icons.pending, color: Colors.yellow)
            : const Icon(Icons.done, color: Colors.green)),
      ]),
    ],
  );
}

Widget createButton(String S, BuildContext context, Map data, Color color) {
  return Container(
    padding: const EdgeInsets.all(20),
    alignment: Alignment.center,
    child: ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: color, // background
        onPrimary: Colors.white, // foreground
        alignment: Alignment.center,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 5,
      ),
      onPressed: () {
        if (S == 'Check') {}
        if (S == 'Accept') {
          if (UserData.Userdata!['user']['is_chairman'] == true) {
            sent(
                data, 'http://127.0.0.1:8000/api/chairman-accept-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_provost'] == true) {
            sent(data, 'http://127.0.0.1:8000/api/provost-accept-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_librarian'] == true) {
            sent(data,
                'http://127.0.0.1:8000/api/librarian-accept-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_examController'] == true) {
            sent(data,
                'http://127.0.0.1:8000/api/examController-accept-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
        }
        if (S == 'Reject') {
          if (UserData.Userdata!['user']['is_chairman'] == true) {
            sent(
                data, 'http://127.0.0.1:8000/api/chairman-reject-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_provost'] == true) {
            sent(data, 'http://127.0.0.1:8000/api/provost-reject-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_librarian'] == true) {
            sent(data,
                'http://127.0.0.1:8000/api/librarian-reject-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
          if (UserData.Userdata!['user']['is_examController'] == true) {
            sent(data,
                'http://127.0.0.1:8000/api/examController-reject-provisional/');
            Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DashBoard(0),
            ));
          }
        }
      },
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Text(
          S,
          style: boldText,
        ),
      ),
    ),
  );
}

void sent(Map data, String link) async {
  try {
    http.Response response = await http.post(Uri.parse(link), body: {
      'student_email': data['student_details']['email'],
    });
    if (response.statusCode == 200) {
      print('successful login');
    } else {
      print("Not a valid user");
    }
  } catch (e) {
    print(e.toString());
  }
}
