import 'package:flutter/material.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import '../models/NavigationDrawer2.dart';
import '../constants/const.dart';
import '../screens/PaymentScreen.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var paymentLabels = [
    'Provisonal Certificate',
    //'Transcript',
    // 'Medium of Instruction'
  ];
  int value = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavigationDrawer2(),
      appBar: AppBar(
        title: Text(
          "NSTU",
          style: Title_style,
        ),
        centerTitle: true,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(alignment: Alignment.bottomCenter, children: <Widget>[
            Image(
              image: const AssetImage('assets/nstu.jpg'),
              height: 300,
              width: MediaQuery.of(context).size.height,
              fit: BoxFit.fill,
            ),
            Text(
              "Noakhali Science and Technology University",
              style: TextStyle(
                shadows: [
                  Shadow(
                    offset: const Offset(2.0, 2.0), //position of shadow
                    blurRadius: 1.0, //blur intensity of shadow
                    color: Colors.black
                        .withOpacity(0.8), //color of shadow with opacity
                  ),
                ],
                fontSize: 20,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ]),
          Container(
              padding: const EdgeInsets.all(15),
              height: (MediaQuery.of(context).size.height) * .2,
              width: MediaQuery.of(context).size.width,
              color: const Color.fromARGB(255, 184, 167, 212),
              child: Card(
                  elevation: 15,
                  child: Column(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: DefaultTextStyle(
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20.0,
                            fontFamily: 'Agne',
                            color: Colors.blue,
                            letterSpacing: 3,
                          ),
                          child: AnimatedTextKit(
                            animatedTexts: [
                              TypewriterAnimatedText(
                                  'Welcome To NSTU Document Processing Portal'),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ))),
          const SizedBox(
            height: 10,
          ),
          Container(
            padding: const EdgeInsets.all(10),
            alignment: Alignment.center,
            child: Text(
              'Choose Document',
              style: boldText,
            ),
          ),
          Expanded(
            child: ListView.separated(
              itemCount: paymentLabels.length,
              itemBuilder: (context, index) {
                return ListTile(
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
                  trailing: const Icon(
                    Icons.insert_drive_file_outlined,
                    color: Colors.deepPurple,
                  ),
                );
              },
              separatorBuilder: (context, index) {
                return const Divider();
              },
            ),
          ),
          Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(10),
            child: ElevatedButton(
              style: ElevatedButtonStyle1,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Payment()),
                );
              },
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Text(
                  'Select',
                  style: boldText,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
