#define trigPin  13
#define echoPin  12
#define gatePin  11
#define ledPin   10
#define humidPin A0

#define USONIC_DIV            58.0
#define MEASURE_SAMPLE_DELAY  5
#define MEASURE_SAMPLES       25
#define MEASURE_DELAY         250

String uid;
String inData;

bool isBlinking = false;
bool isLedOn = false;

void setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(humidPin, INPUT);
  pinMode(gatePin, OUTPUT); 
  pinMode(ledPin, OUTPUT); 

  randomSeed(analogRead(0));

  // generate Unique ID upon setup
  uid = generateUid();
}

void loop()
{
  receiveWrites();
  distance();
  humidity();
  ledBlinking();
  delay(1000);
}

String generateUid()
{
    String characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int charLength = 3;
    String str = "";

    for (int i = 0; i < charLength; i += 1) {
        str += characters[floor(random(0, (characters.length() - 1)))];
    }

    return str;
}


void receiveWrites()
{
  while (Serial.available() > 0) {
    char received = Serial.read();
    inData.concat(received);

    // Process message when new line character is received
    if (received == '#') {
//        Serial.println("!!!" + inData + "!!!");

        // open gate
        if (inData == "g1#") {
          Serial.println(uid + "g1");
          digitalWrite(gatePin, HIGH);
          isBlinking = true;
        }

        // close gate
        if (inData == "g0#") {
          Serial.println(uid + "g0");
          digitalWrite(gatePin, LOW);
          isBlinking = false;
        }

        inData = "";
    }
  }
}

void distance()
{
  delay(MEASURE_DELAY);
  
  long distance = measure();

  // convert to prct
  int prct = 130 - 13 * distance / 10;
  if (prct > 100) prct = 100;
  if (prct < 0) prct = 0;

  if (prct >= 80) digitalWrite(ledPin, HIGH);
  if (prct < 80) digitalWrite(ledPin, LOW);

  String val = String(uid) + "w" + String(distance);
  
  Serial.println(val);
}

long measure()
{
  long measureSum = 0;
  
  for (int i = 0; i < MEASURE_SAMPLES; i++) {
    delay(MEASURE_SAMPLE_DELAY);
    measureSum += singleMeasurement();
  }
  
  return measureSum / MEASURE_SAMPLES;
}

long singleMeasurement()
{
  long duration = 0;
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(11);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  
  return (long) (((float) duration / USONIC_DIV) * 10.0);
}


void humidity()
{
  int humidity = analogRead(A0);
  String val;
  
  if (humidity > 100) {
    val = String(uid) + "h" + String(humidity);
    Serial.println(val);
  }
}

void ledBlinking()
{
  if (isBlinking) {
    if (isLedOn) {
      digitalWrite(ledPin, LOW);
      isLedOn = false;
    } else {
      digitalWrite(ledPin, HIGH);
      isLedOn = true;
    }
  }
}

