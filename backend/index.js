import { MongoClient, ServerApiVersion } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let ecg_monitoring_data;
let temperature_data;
let heartandpulse_data;
let bloodpressure_data;
let userinfo;

async function run() {
  try {
    await client.connect();
    const db = client.db("BioSync360");

    temperature_data = db.collection("temperatureMonitoring");

    ecg_monitoring_data = db.collection("EcgMonitoring");

    heartandpulse_data = db.collection("HeartAndPulseMonitoring");

    bloodpressure_data = db.collection("BloodPressureMonitoring");

    userinfo = db.collection("UserInformation");

    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

app.post("/ecg_monitoring_data", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await ecg_monitoring_data.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

app.post("/userinfo", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await userinfo.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

app.post("/temperature_data", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await temperature_data.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

app.post("/heartandpulse_data", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await heartandpulse_data.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

app.post("/bloodpressure_data", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await bloodpressure_data.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});


app.post("/spo2_suggestions", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required in the request body",
      });
    }

    const data = await bloodpressure_data.find({ username }).toArray();

    if (data && data.length > 0) {
      const spO2Value = data[0].currentsp02;
      if (!spO2Value) {
        return res.status(404).json({
          message: "SpO2 value not found for the specified username.",
        });
      }

      const prompt = `
        Give me the current status of the SpO2 monitoring. 
        If the status is not good, suggest ways to improve it based on the current SpO2 value: ${spO2Value}%.
        Provide clear and actionable suggestions for maintaining healthy SpO2 levels in paragraph.
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        res.json({ text });
      } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
          message: "An error occurred while generating suggestions.",
          error: error.message,
        });
      }
    } else {
      res.status(404).json({
        message: "No data found for the specified username.",
      });
    }
  } catch (error) {
    console.error("Error in /chatbot route:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
});




app.post("/temperature_suggestions", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required in the request body",
      });
    }

    const data = await temperature_data.find({ username }).toArray();

    if (data && data.length > 0) {
      const temp = data[0].currenttemperature;
      if (!temp) {
        return res.status(404).json({
          message: "SpO2 value not found for the specified username.",
        });
      }

      const prompt = `
        Give me the current status of the Temperature monitoring. 
        If the status is not good, suggest ways to improve it based on the current temperature value: ${temp} fahrenheit.
        Provide clear and actionable suggestions for maintaining healthy temperature levels in paragraph.
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        res.json({ text });
      } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
          message: "An error occurred while generating suggestions.",
          error: error.message,
        });
      }
    } else {
      res.status(404).json({
        message: "No data found for the specified username.",
      });
    }
  } catch (error) {
    console.error("Error in /chatbot route:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
});



app.post("/pulseandheartrate_suggestions", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required in the request body",
      });
    }

    const data = await heartandpulse_data.find({ username }).toArray();

    if (data && data.length > 0) {
      const pulserate = data[0].currentpulseRate;
      const heartrate = data[0].currentheartRate;
      if (!pulserate || !heartrate) {
        return res.status(404).json({
          message: "heart rate and pulse rate value not found for the specified username.",
        });
      }

      const prompt = `
        Give me the current status of the heart rate and pulse rate monitoring. 
        If the status is not good, suggest ways to improve it based on the current Heart rate value: ${heartrate}bpm and Pulse rate value : ${pulserate}bpm.
        Provide clear and actionable suggestions for maintaining healthy pulse rate and heart rate levels in paragraph.
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        res.json({ text });
      } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
          message: "An error occurred while generating suggestions.",
          error: error.message,
        });
      }
    } else {
      res.status(404).json({
        message: "No data found for the specified username.",
      });
    }
  } catch (error) {
    console.error("Error in /chatbot route:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
});

app.post("/predict", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        message: "Symptoms are required in the request body",
      });
    }

    const prompt = `
Given the following symptoms: ${symptoms}, identify the most likely disease or condition associated with these symptoms. 
Provide a detailed explanation of the disease, including its common symptoms, causes, and potential risks. 
Additionally, suggest appropriate treatments, remedies, or lifestyle changes that can help manage or cure the disease. 
Offer guidance on preventive measures, lifestyle modifications, and when to seek professional medical attention.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      res.json({ text });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({
        message: "An error occurred while generating suggestions.",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error in /predict route:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
});




const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
