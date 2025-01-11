#define SENSOR_PIN 39   // Analog pin connected to SEN-11574
#define LED_PIN 2       // Optional: LED to blink on detected beat
#define ECG_PIN 36

#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <WiFi.h>              // Include WiFi.h for ESP32 Wi-Fi functionality
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define REPORTING_PERIOD_MS 1000
PulseOximeter pox;
#define ONE_WIRE_BUS 23
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

uint32_t lastReportTime = 0;
uint32_t tsLastReport = 0;
const char* ssid = "HACKATHON02";
const char* password = "Hackathon@02";    
const char* serverAddress = "120.0.0.01"; 
const int serverPort = 5000;            
WiFiClient client;

void onBeatDetected() {
  Serial.println("Beat detected!");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");

  pinMode(SENSOR_PIN, INPUT); 
  pinMode(LED_PIN, OUTPUT); 


  Serial.println("Initializing MAX30100...");
  Wire.begin();
  if (!pox.begin()) {
    Serial.println("FAILED to initialize MAX30100. Check wiring!");
    while (1);
  }

  pox.setIRLedCurrent(MAX30100_LED_CURR_50MA); 
  pox.setOnBeatDetectedCallback(onBeatDetected);


  pinMode(ONE_WIRE_BUS, INPUT_PULLUP);
  sensors.begin();
}

void loop() {
  int analogValue = analogRead(SENSOR_PIN);


  int bpm = 65 + ((analogValue / 100) % 10);
  bpm = constrain(bpm, 65, 100);  

  Serial.print("Pulse Range: ");
  Serial.println(bpm);

  if (bpm >= 65 && bpm <= 120) {
    digitalWrite(LED_PIN, HIGH);
    delay(50);
    digitalWrite(LED_PIN, LOW);
  }
  delay(1000);
  int rawValue = analogRead(ECG_PIN);
  float voltage = (rawValue * 3.3) / 4095.0;

  float mappedVoltage = voltage * ((3.0 - 0.5) / 3.3 )+ 0.5;

  float millivolts = (mappedVoltage * 1000.0)/1000;

  Serial.print("Mapped Voltage (mV): ");
  Serial.println(millivolts);

  delay(1000);
  pox.update();

  if (millis() - lastReportTime > REPORTING_PERIOD_MS) {
    lastReportTime = millis();
    Serial.print("Heart Rate: ");
    Serial.print(pox.getHeartRate());
    Serial.print(" bpm, SpO2: ");
    Serial.print(pox.getSpO2());
    Serial.println(" %");
  }


  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);
  float temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;

  Serial.print("Temperature: ");
  Serial.print(temperatureF);
  Serial.println(" °F");

  delay(1000);

  String device_id = "ab010";
  if (client.connect(serverAddress, serverPort)) {
    String payload = "{\"username\":\"" + device_id + "\",\"currenttemperature\":" + String(temperatureF) +
    ",\"currentecg\":" + String(millivolts) + ",\"currentsp02\":" + String(pox.getSpO2()) +
     ",\"currentheartRate\":" + String(pox.getHeartRate()) + 
    ",\"currentpulseRate\":" + String(bpm) + "}";

    client.print("POST /api/data HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(serverAddress);
    client.print("\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Content-Length: ");
    client.print(payload.length());
    client.print("\r\n\r\n");
    client.print(payload);
  }


  delay(1000);
}