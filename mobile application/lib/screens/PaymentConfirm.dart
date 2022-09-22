import 'package:flutter/material.dart';
import '../constants/const.dart';
import '../screens/Home.dart';
import '../models/NavigationDrawer.dart';

class Success extends StatefulWidget {
  const Success({Key? key}) : super(key: key);

  @override
  State<Success> createState() => _SuccessState();
}

class _SuccessState extends State<Success> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Payment'.toUpperCase(), style: Title_style),
        centerTitle: true,
      ),
      drawer: NavigationDrawer(),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            alignment: Alignment.center,
            padding: EdgeInsets.all(30),
            child: Image(
              image: AssetImage(
                'assets/correct.png',
              ),
              height: 150,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Text('Your Payment is Successful'),
          ),
          ElevatedButton(
            style: ElevatedButtonStyle2,
            onPressed: (() {
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: (context) => Home()));
            }),
            child: Text(
              'Confirm',
              style: boldText,
            ),
          ),
        ],
      ),
    );
  }
}
