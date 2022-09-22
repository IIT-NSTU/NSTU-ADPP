import 'package:flutter/material.dart';

final Title_style = TextStyle(
  fontSize: 20,
  fontWeight: FontWeight.bold,
  letterSpacing: 5,
  color: Colors.white,
);

final loginBackGroundColor = [
  Color(0xFF73AEF5),
  Color(0xFF61A4F1),
  Color(0xFF478DE0),
  Color(0xFF398AE5),
];
final loginBox = BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(10),
    boxShadow: [
      BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2))
    ]);

final boldText =
    TextStyle(fontSize: 20, fontWeight: FontWeight.bold, letterSpacing: 3);

final normalText =
    TextStyle(fontSize: 15, fontWeight: FontWeight.normal, letterSpacing: 1);

final ElevatedButtonStyle1 = ElevatedButton.styleFrom(
  primary: Colors.blue, // background
  onPrimary: Colors.white, // foreground
  alignment: Alignment.center,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
  elevation: 5,
);
final ElevatedButtonStyle2 = ElevatedButton.styleFrom(
  padding: EdgeInsets.all(30),
  primary: Colors.blue, // background
  onPrimary: Colors.white, // foreground
  alignment: Alignment.center,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
  elevation: 5,
);
final ElevatedButtonStyle3 = ElevatedButton.styleFrom(
  padding: EdgeInsets.all(20),
  primary: Colors.blue, // background
  onPrimary: Colors.white, // foreground
  alignment: Alignment.bottomCenter,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
  elevation: 5,
);
