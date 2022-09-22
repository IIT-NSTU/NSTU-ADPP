import 'package:flutter/material.dart';
import 'package:ndpp/models/Userdata.dart';
import 'package:ndpp/screens/loginScreen.dart';
import '../screens/Home.dart';
import '../screens/ForgetPasswordScreen.dart';

class NavigationDrawer2 extends StatelessWidget {
  final padding = const EdgeInsets.symmetric(horizontal: 20);
  @override
  Widget build(BuildContext context) {
    // final name = 'Md. Al-Amin';
    // final email = 'alamin2514@student.nstu.edu.bd';
    return Drawer(
      child: Material(
        color: const Color(0xFF73AEF5),
        child: ListView(
          children: <Widget>[
            // DrawerHeader(
            //   child: buildHeader(
            //     name: name,
            //     email: email,
            //   ),
            // ),
            Container(
              padding: padding,
              child: Column(
                children: [
                  const SizedBox(height: 12),
                  buildMenuItem(
                    text: "Home",
                    icon: Icons.home,
                    onClicked: () => selectedItem(context, 0),
                  ),
                  buildMenuItem(
                    text: "Reset Password",
                    icon: Icons.key,
                    onClicked: () => selectedItem(context, 1),
                  ),
                  buildMenuItem(
                    text: "Change Email",
                    icon: Icons.login_outlined,
                    onClicked: () => selectedItem(context, 2),
                  ),
                  buildMenuItem(
                    text: "Back",
                    icon: Icons.backspace,
                    onClicked: () => selectedItem(context, 3),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Widget buildHeader({
//   required String name,
//   required String email,
// }) =>
//     InkWell(
//       child: Container(
//         padding: const EdgeInsets.all(20),
//         child: Row(
//           children: [
//             Column(
//               crossAxisAlignment: CrossAxisAlignment.center,
//               children: [
//                 Text(
//                   name,
//                   style: TextStyle(
//                       fontSize: 20,
//                       color: Colors.white,
//                       fontWeight: FontWeight.bold),
//                 ),
//                 const SizedBox(height: 10),
//                 Text(
//                   email,
//                   style: TextStyle(fontSize: 10, color: Colors.white),
//                 ),
//               ],
//             ),
//           ],
//         ),
//       ),
//     );

Widget buildMenuItem({
  required String text,
  required IconData icon,
  VoidCallback? onClicked,
}) {
  final color = Colors.white;
  final hoverColor = Colors.white70;

  return ListTile(
    leading: Icon(icon, color: color),
    title: Text(text, style: TextStyle(color: color)),
    hoverColor: hoverColor,
    onTap: onClicked,
  );
}

void selectedItem(BuildContext context, int index) {
  Navigator.of(context).pop();

  switch (index) {
    case 0:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => Home(),
      ));

      break;
    case 1:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => PasswordPage(),
      ));
      break;
    case 2:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => PasswordPage(),
      ));
      break;
    case 3:
      Navigator.of(context).pop();
      break;
  }
}
