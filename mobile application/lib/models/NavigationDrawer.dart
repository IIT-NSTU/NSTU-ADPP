import 'package:flutter/material.dart';
import '../models/Userdata.dart';
import '../screens/dashboard.dart';

class NavigationDrawer extends StatelessWidget {
  final padding = const EdgeInsets.symmetric(horizontal: 20);
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: const Color(0xFF73AEF5),
        child: ListView(
          children: <Widget>[
            Container(
              padding: padding,
              child: Column(
                children: [
                  const SizedBox(height: 12),
                  buildMenuItem(
                    text: "Pending Request",
                    icon: Icons.home,
                    onClicked: () => selectedItem(context, 0),
                  ),
                  const SizedBox(height: 24),
                  buildMenuItem(
                    text: "Accepted Request",
                    icon: Icons.login,
                    onClicked: () => selectedItem(context, 1),
                  ),
                  buildMenuItem(
                    text: "Rejected Request",
                    icon: Icons.password_rounded,
                    onClicked: () => selectedItem(context, 2),
                  ),
                  buildMenuItem(
                    text: "Log Out",
                    icon: Icons.logout_outlined,
                    onClicked: () => selectedItem(context, 3),
                  ),
                  buildMenuItem(
                    text: "Back",
                    icon: Icons.backspace_outlined,
                    onClicked: () => selectedItem(context, 4),
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
        builder: (context) => DashBoard(0),
      ));

      break;
    case 1:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => DashBoard(1),
      ));
      break;
    case 2:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => DashBoard(2),
      ));
      break;
    case 4:
      Navigator.of(context).pop();
      break;
  }
}
