import 'package:flutter/material.dart';
import '../screens/dashboard.dart';
import '../constants/const.dart';
import '../models/NavigationDrawer.dart';

class CommentPage extends StatefulWidget {
  CommentPage({Key? key}) : super(key: key);

  @override
  State<CommentPage> createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  TextEditingController comment = new TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavigationDrawer(),
      appBar: AppBar(
        title: Text('Comment'.toUpperCase(), style: Title_style),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(30),
              child: TextFormField(
                controller: comment,
                minLines: 2,
                maxLines: 100,
                keyboardType: TextInputType.multiline,
                decoration: InputDecoration(
                    hintText: 'Enter Reason',
                    hintStyle: TextStyle(
                      color: Colors.grey,
                    ),
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(18)))),
              ),
            ),
            TextButton(
              style: ElevatedButtonStyle2,
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => DashBoard(0),
                ),
              ),
              child: Text(
                'Send',
                style: boldText,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
