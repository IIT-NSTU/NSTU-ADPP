import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:ndpp/screens/Home.dart';
import 'dart:convert';
import './ForgetPasswordScreen.dart';
import './dashboard.dart';
import '../models/Userdata.dart';
import '../constants/const.dart';
import '../screens/CheckStatus.dart';

//import './student_details.dart';

class loginPage extends StatefulWidget {
  loginPage({Key? key}) : super(key: key);

  @override
  State<loginPage> createState() => _loginPageState();
}

class _loginPageState extends State<loginPage> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  Map? mapresponse;
  void login(String email, password) async {
    showDialog(
        context: context,
        builder: ((context) {
          return const Center(child: CircularProgressIndicator());
        }));
    try {
      http.Response response =
          await http.post(Uri.parse('http://127.0.0.1:8000/api/login/'), body: {
        'email': email,
        'password': password,
      });
      Navigator.of(context).pop();
      if (response.statusCode == 200) {
        mapresponse = json.decode(response.body);
        UserData.Userdata = mapresponse;
        if (mapresponse!['user']['is_student'] == true) {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const Home()),
          );
        }
        if (mapresponse!['user']['is_chairman'] == true ||
            mapresponse!['user']['is_provost'] == true ||
            mapresponse!['user']['is_librarian'] == true ||
            mapresponse!['user']['is_examController'] == true) {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => DashBoard(0)),
          );
        }
        print('successful login');
      } else {
        print("Not a valid user");
      }
    } catch (e) {
      print(e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: GestureDetector(
        child: Stack(children: <Widget>[
          Container(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            padding: EdgeInsets.all(15),
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: loginBackGroundColor)),
            child: SingleChildScrollView(
              physics: AlwaysScrollableScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 25, vertical: 120),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'NSTU Academic DOCUMNENTS'.toUpperCase(),
                    style: Title_style,
                  ),
                  Container(
                    alignment: Alignment.center,
                    child: Text(
                      'Processing Portal'.toUpperCase(),
                      style: Title_style,
                    ),
                  ),
                  SizedBox(height: 10),
                  Image(image: AssetImage('assets/logo.gif')),
                  SizedBox(height: 40),
                  buildEmailField('Email', emailController),
                  SizedBox(height: 10),
                  buildPasswordField('Password', passwordController),
                  forgetPassword(context),
                  SizedBox(height: 10),
                  Container(
                    padding: EdgeInsets.symmetric(vertical: 35),
                    width: double.infinity,
                    child: ElevatedButton(
                      child: Text(
                        'Sign In',
                        style: TextStyle(
                            color: Color(0xFF398AE5),
                            fontSize: 30,
                            fontWeight: FontWeight.bold),
                      ),
                      onPressed: () {
                        login(emailController.text.trim().toString(),
                            passwordController.text.trim().toString());
                        (mapresponse == null)
                            ? Text("Data is loading")
                            : Text(mapresponse!['user'].toString());
                      },
                      style: ButtonStyle(
                          padding: MaterialStateProperty.all<EdgeInsets>(
                              EdgeInsets.all(15)),
                          backgroundColor:
                              MaterialStateProperty.all<Color>(Colors.white),
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ))),
                    ),
                  ),
                ],
              ),
            ),
          )
        ]),
      ),
    ));
  }
}

Widget buildEmailField(String S, TextEditingController emailController) {
  return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        const SizedBox(height: 10),
        Container(
          alignment: Alignment.centerLeft,
          decoration: loginBox,
          height: 50,
          child: TextField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            style: const TextStyle(color: Colors.black87),
            decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14),
                prefixIcon: Icon(
                  Icons.email,
                  color: Color(0xFF398AE5),
                ),
                hintText: S,
                hintStyle: TextStyle(color: Colors.black87)),
          ),
        )
      ]);
}

Widget buildPasswordField(String S, TextEditingController passwordController) {
  return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        const SizedBox(height: 10),
        Container(
          alignment: Alignment.centerLeft,
          decoration: loginBox,
          height: 50,
          child: TextField(
            controller: passwordController,
            obscureText: true,
            //  keyboardType: TextInputType.emailAddress,
            style: const TextStyle(color: Colors.black87),
            decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14),
                prefixIcon: Icon(
                  Icons.key,
                  color: Color(0xFF398AE5),
                ),
                hintText: S,
                hintStyle: TextStyle(color: Colors.black87)),
          ),
        )
      ]);
}

Widget forgetPassword(BuildContext context) {
  return Container(
    alignment: Alignment.centerRight,
    child: TextButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => PasswordPage()),
          );
        },
        child: Text(
          'New User or Forget Password?',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        )),
  );
}
