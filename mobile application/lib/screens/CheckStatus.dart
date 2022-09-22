import 'package:flutter/material.dart';

import '../constants/const.dart';
import '../models/Userdata.dart';

class CheckStatus extends StatelessWidget {
  CheckStatus({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Student Details',
          style: boldText,
        ),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          children: [
            statusTable(UserData.Userdata),
          ],
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
