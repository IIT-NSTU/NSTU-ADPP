import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ndpp/models/Userdata.dart';
import 'dart:convert';
import './student_details.dart';
import '../models/NavigationDrawer.dart';
import '../constants/const.dart';

class DashBoard extends StatefulWidget {
  int count = 0;
  DashBoard(this.count, {Key? key}) : super(key: key);

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  var data, data2, data3;
  // var response;
  //var response1, response2, response3;

  Future<void> getUserApi() async {
    if (UserData.Userdata!['user']['is_chairman'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-chairman/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-accepted-list-by-chairman/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-rejected-list-by-chairman/')),
      ]);
      var response1 = response.first;
      var response2 = response[1];
      var response3 = response[2];
      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
        print(data);
      } else {
        print('No Response-1');
      }
      if (response2.statusCode == 200) {
        data2 = jsonDecode(response2.body.toString());
        // print(data2);
      } else {
        print('No Response-2');
      }
      if (response3.statusCode == 200) {
        data3 = jsonDecode(response3.body.toString());
        //  print(data3);
      } else {
        print('No Response-3');
      }
    }
    if (UserData.Userdata!['user']['is_provost'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-provost/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-accepted-list-by-provost/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-rejected-list-by-provost/')),
      ]);
      var response1 = response.first;
      var response2 = response[1];
      var response3 = response[2];
      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
        print(data);
      } else {
        print('No Response-1');
      }
      if (response2.statusCode == 200) {
        data2 = jsonDecode(response2.body.toString());
        // print(data2);
      } else {
        print('No Response-2');
      }
      if (response3.statusCode == 200) {
        data3 = jsonDecode(response3.body.toString());
        //  print(data3);
      } else {
        print('No Response-3');
      }
    }

    if (UserData.Userdata!['user']['is_librarian'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-librarian/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-accepted-list-by-librarian/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-rejected-list-by-librarian/')),
      ]);
      var response1 = response.first;
      var response2 = response[1];
      var response3 = response[2];
      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
        print(data);
      } else {
        print('No Response-1');
      }
      if (response2.statusCode == 200) {
        data2 = jsonDecode(response2.body.toString());
        // print(data2);
      } else {
        print('No Response-2');
      }
      if (response3.statusCode == 200) {
        data3 = jsonDecode(response3.body.toString());
        //  print(data3);
      } else {
        print('No Response-3');
      }
    }

    if (UserData.Userdata!['user']['is_examController'] == true) {
      final response = await Future.wait([
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-applied-list-for-examController/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-accepted-list-by-examController/')),
        http.get(Uri.parse(
            'http://127.0.0.1:8000/api/provisional-rejected-list-by-examController/')),
      ]);

      var response1 = response.first;
      var response2 = response[1];
      var response3 = response[2];
      if (response1.statusCode == 200) {
        data = jsonDecode(response1.body.toString());
        print(data);
      } else {
        print('No Response-1');
      }
      if (response2.statusCode == 200) {
        data2 = jsonDecode(response2.body.toString());
        // print(data2);
      } else {
        print('No Response-2');
      }
      if (response3.statusCode == 200) {
        data3 = jsonDecode(response3.body.toString());
        //  print(data3);
      } else {
        print('No Response-3');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavigationDrawer(),
      appBar: AppBar(
        title: Text(
          "Admin Panel",
          style: Title_style,
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(children: <Widget>[
          FutureBuilder(
              future: getUserApi(),
              builder: ((context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Text("Wait data loading");
                } else {
                  return DashBoradDesign(context, data, data2, data3);
                }
              })),
          FutureBuilder(
              future: getUserApi(),
              builder: ((context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Text("Wait data loading");
                } else {
                  return Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(20),
                    child: Text(
                      'Student List',
                      style: boldText,
                    ),
                  );
                }
              })),
          FutureBuilder(
              future: getUserApi(),
              builder: ((context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Text("Wait data loading");
                } else {
                  if (widget.count == 0) {
                    return studentList(context, data);
                  } else if (widget.count == 1) {
                    return studentList(context, data2);
                  } else if (widget.count == 2) {
                    return studentList(context, data3);
                  } else {
                    return studentList(context, data);
                  }
                }
              })),
        ]),
      ),
    );
  }
}

Widget DashBoradDesign(BuildContext context, var data, data2, data3) {
  return Column(children: <Widget>[
    Row(
      children: <Widget>[
        dashcard(context, "Pending Request", data.length, Colors.yellow),
        dashcard(context, "Accepted Request", data2.length, Colors.green),
      ],
    ),
    Row(
      children: <Widget>[
        dashcard(context, "Rejected Request", data3.length, Colors.red),
        dashcard(context, "Total Request",
            (data.length + data2.length + data3.length), Colors.blue),
      ],
    ),
  ]);
}

Widget dashcard(
    BuildContext context, String name, int number, Color usercolor) {
  return Padding(
    padding: const EdgeInsets.all(20.0),
    child: Card(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: Container(
          width: (MediaQuery.of(context).size.width) * .3,
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(color: usercolor, width: 10),
            ),
          ),
          padding: const EdgeInsets.all(20.0),
          child: Text(
            name + '\n\n ' + number.toString(),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
      elevation: 5,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    ),
  );
}

Widget studentList(BuildContext context, var data) {
  if (data.length > 0) {
    return Expanded(
      child: ListView.builder(
          itemCount: data.length,
          itemBuilder: ((context, index) {
            return InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => StudentDetails(data[index])),
                );
              },
              child: Card(
                child: ListTile(
                  title: //Text(nameList['student_details']['name'].toString()),
                      Text(
                    data[index]['student_details']['name'].toString(),
                  ),
                  trailing: Container(
                    height: 40,
                    width: 100,
                    padding: EdgeInsets.all(5),
                    decoration: BoxDecoration(
                        color: Color(0xFF398AE5),
                        borderRadius: BorderRadius.circular(10)),
                    child: Center(
                      child: Text(
                        'View',
                        style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white),
                      ),
                    ),
                  ),
                ),
              ),
            );
          })),
    );
  } else {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(border: Border.all()),
      alignment: Alignment.center,
      child: Text('No Request to Show', style: boldText),
    );
  }
}
