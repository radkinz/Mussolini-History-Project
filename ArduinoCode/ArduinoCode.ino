int lights[] = {12, 11, 10, 9, 8, 7, 6, 5, 4, 3}; //store led light pins
int value = 0;

void setup() {
  pinMode(12, OUTPUT); // Set pin as OUTPUT
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(7, OUTPUT); 
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(3, OUTPUT);
  Serial.begin(9600); // Start serial communication at 9600 bps
}

void loop() {
  //turn every light off unless otherwise
  for (int i = 0; i < 10; i++) {
    digitalWrite(lights[i], LOW);
  }

  //check serial date if need to turn light on
  if (Serial.available())
  {
    // If data is available, read serial port
    value = Serial.read();

    //turn necessary light on
    digitalWrite(value, HIGH);
   // Serial.println(value);
  }

  delay(10);
}
