void setup()
{
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop()
{
  int val = analogRead(A0); //take a sample

  // send value out to Serial
  if (val > 100)
    Serial.print(val);
  
  delay(5000);
}
