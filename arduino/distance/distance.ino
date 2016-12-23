#define trigPin  13
#define echoPin  12
#define humidPin A0

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(humidPin, INPUT);
}

void loop() {
  distance();
  humidity();
  delay(1000);
}


void distance()
{
  long duration, distance;
  String val;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  
  if (distance <= 0 || distance >= 200)
    distance = -1;

  val = "w" + String(distance);
  Serial.println(val);
}


void humidity()
{
  int humidity = analogRead(A0);
  String val;
  
  if (humidity > 100) {
    val = "h" + String(humidity);
    Serial.println(val);
  }
}

