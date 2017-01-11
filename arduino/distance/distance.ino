#define trigPin  13
#define echoPin  12
#define humidPin A0

#define USONIC_DIV            58.0
#define MEASURE_SAMPLE_DELAY  5
#define MEASURE_SAMPLES       25
#define MEASURE_DELAY         250

String uid;

void setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(humidPin, INPUT);

  randomSeed(analogRead(0));

  // generate Unique ID upon setup
  uid = generateUid();
}

void loop()
{
  distance();
  humidity();
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


void distance()
{
  delay(MEASURE_DELAY);
  
  long distance = measure();
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

