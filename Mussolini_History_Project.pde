import processing.serial.*;
//Create object from Serial class
Serial myPort; 

//create box arr
Box[] box = new Box[10];

//box dimension vars
int boxWidth = 20;
int boxHeight = 100;

//number of lights 
int lightNum = 10;

void setup() {
  //set window dimensions
  size(500, 500);

  // Open port
  String portName = Serial.list()[0]; 
  myPort = new Serial(this, portName, 9600);

  //create boxes for user to click to trigger different lights
  for (int i = 0; i < lightNum; i++) {
    box[i] = new Box(10+i*(boxWidth+25), 20+(boxHeight+25), 12-i);
  }
}

void draw() {
  background(0);
  //store values of what light should be on in byte form to send to arduino
  for (int i = 0; i < box.length; i++) {
    box[i].show();
    //get pin light location that user click on
    if (box[i].lightOn()) {
      int output = box[i].pin;
      myPort.write(output);
      break;
    }
  }

  //debug listening to port
  //println(myPort.readStringUntil('\n'));
}
