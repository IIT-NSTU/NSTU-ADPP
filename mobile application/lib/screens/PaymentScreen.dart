import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import './PaymentConfirm.dart';
import '../models/NavigationDrawer.dart';
import '../constants/const.dart';

class Payment extends StatefulWidget {
  Payment({Key? key}) : super(key: key);

  @override
  _PaymentState createState() => _PaymentState();
}

class _PaymentState extends State<Payment> {
  var paymentLabels = ['bkash', 'Nagad', 'Rocket'];
  int value = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavigationDrawer(),
      appBar: AppBar(
        title: Text('Payment'.toUpperCase(), style: Title_style),
        centerTitle: true,
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(40),
              child: Text(
                'Choose your payment method',
                style: boldText,
              ),
            ),
            Container(
              height: (MediaQuery.of(context).size.height) * .3,
              child: ListView.separated(
                itemCount: paymentLabels.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    contentPadding: const EdgeInsets.only(left: 50, right: 50),
                    leading: Radio(
                      activeColor: Colors.blue,
                      value: index,
                      groupValue: value,
                      onChanged: (i) => setState(() => value = i as int),
                    ),
                    title: Text(
                      paymentLabels[index],
                      style: normalText,
                    ),
                    trailing: Icon(
                      Icons.payment,
                      color: Colors.deepPurple,
                    ),
                  );
                },
                separatorBuilder: (context, index) {
                  return const Divider();
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              // crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  'Attach SSC Certificate',
                  style: normalText,
                ),
                Container(
                  padding: EdgeInsets.all(20),
                  child: ElevatedButton(
                      style: ElevatedButtonStyle3,
                      onPressed: (() async {
                        final result = await FilePicker.platform.pickFiles();
                        if (result == null) return;
                        final file = result.files.first;
                      }),
                      child: Text(
                        'Attach',
                        style: normalText,
                      )),
                ),
              ],
            ),
            SizedBox(
              height: 50,
            ),
            TextButton(
              style: ElevatedButtonStyle2,
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => Success(),
                ),
              ),
              child: Text(
                'Confirm',
                style: boldText,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
