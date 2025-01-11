from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from datetime import datetime
import numpy as np
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
import statistics

final_rf_model = pickle.load(open("final_rf_model.pkl", "rb"))
final_nb_model = pickle.load(open("final_nb_model.pkl", "rb"))
final_svm_model = pickle.load(open("final_svm_model.pkl", "rb"))
data_dict = pickle.load(open("data_dict.pkl", "rb"))

connection_url = 'mongodb+srv://aswin2005:Aswin123@project.rddo8i4.mongodb.net/?retryWrites=true&w=majority&appName=PROJECT'

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient(connection_url)
Database = client.get_database('BioSync360')
ecg = Database.EcgMonitoring
bloodpressure = Database.BloodPressureMonitoring
temperature = Database.temperatureMonitoring
heartandpulse = Database.HeartAndPulseMonitoring


current_time = datetime.now()

@app.route('/api/data22', methods=['POST'])
def upsert_sensor_data():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        current_temperature = data.get("currenttemperature")
        current_ecg = data.get("currentecg")
        current_heartRate = data.get("currentheartRate")
        current_pulseRate = data.get("currentpulseRate")
        current_sp02 = data.get("currentsp02")

        if not username or current_temperature is None or not current_time:
            return jsonify({"error": "Username, current temperature, and current time are required"}), 400
        existing_user = temperature.find_one({"username": username})

        existing_user1 = ecg.find_one({"username": username})

        existing_user2 = bloodpressure.find_one({"username": username})

        existing_user3 = heartandpulse.find_one({"username":username})
        
        if existing_user:
            update_fields = {
                "pre6time": existing_user.get("pre5time"),
                "pre6temperature": existing_user.get("pre5temperature"),
                "pre5time": existing_user.get("pre4time"),
                "pre5temperature": existing_user.get("pre4temperature"),
                "pre4time": existing_user.get("pre3time"),
                "pre4temperature": existing_user.get("pre3temperature"),
                "pre3time": existing_user.get("pre2time"),
                "pre3temperature": existing_user.get("pre2temperature"),
                "pre2time": existing_user.get("pre1time"),
                "pre2temperature": existing_user.get("pre1temperature"),
                "pre1time": existing_user.get("currenttime"),
                "pre1temperature": existing_user.get("currenttemperature"),
                "currenttime": current_time.isoformat(),
                "currenttemperature": current_temperature
            }

            temperature.update_one({"username": username}, {"$set": update_fields})
            print("User data updated")
        else:
            new_document = {
                "username": username,
                "currenttime": current_time.isoformat(),
                "currenttemperature": current_temperature,
                "pre1time": None,
                "pre1temperature": None,
                "pre2time": None,
                "pre2temperature": None,
                "pre3time": None,
                "pre3temperature": None,
                "pre4time": None,
                "pre4temperature": None,
                "pre5time": None,
                "pre5temperature": None,
                "pre6time": None,
                "pre6temperature": None
            }
            temperature.insert_one(new_document)
            print("New user data inserted")
        
        if existing_user1:
            update_fields = {
                "pre23time": existing_user1.get("pre22time"),
                "pre23ecg": existing_user1.get("pre22ecg"),
                "pre22time": existing_user1.get("pre21time"),
                "pre22ecg": existing_user1.get("pre21ecg"),
                "pre21time": existing_user1.get("pre20time"),
                "pre21ecg": existing_user1.get("pre20ecg"),
                "pre20time": existing_user1.get("pre19time"),
                "pre20ecg": existing_user1.get("pre19ecg"),
                "pre19time": existing_user1.get("pre18time"),
                "pre19ecg": existing_user1.get("pre18ecg"),
                "pre18time": existing_user1.get("pre17time"),
                "pre18ecg": existing_user1.get("pre17ecg"),
                "pre17time": existing_user1.get("pre16time"),
                "pre17ecg": existing_user1.get("pre16ecg"),
                "pre16time": existing_user1.get("pre15time"),
                "pre16ecg": existing_user1.get("pre15ecg"),
                "pre15time": existing_user1.get("pre14time"),
                "pre15ecg": existing_user1.get("pre14ecg"),
                "pre14time": existing_user1.get("pre13time"),
                "pre14ecg": existing_user1.get("pre13ecg"),
                "pre13time": existing_user1.get("pre12time"),
                "pre13ecg": existing_user1.get("pre12ecg"),
                "pre12time": existing_user1.get("pre11time"),
                "pre12ecg": existing_user1.get("pre11ecg"),
                "pre11time": existing_user1.get("pre10time"),
                "pre11ecg": existing_user1.get("pre10ecg"),
                "pre10time": existing_user1.get("pre9time"),
                "pre10ecg": existing_user1.get("pre9ecg"),
                "pre9time": existing_user1.get("pre8time"),
                "pre9ecg": existing_user1.get("pre8ecg"),
                "pre8time": existing_user1.get("pre7time"),
                "pre8ecg": existing_user1.get("pre7ecg"),
                "pre7time": existing_user1.get("pre6time"),
                "pre7ecg": existing_user1.get("pre6ecg"),
                "pre6time": existing_user1.get("pre5time"),
                "pre6ecg": existing_user1.get("pre5ecg"),
                "pre5time": existing_user1.get("pre4time"),
                "pre5ecg": existing_user1.get("pre4ecg"),
                "pre4time": existing_user1.get("pre3time"),
                "pre4ecg": existing_user1.get("pre3ecg"),
                "pre3time": existing_user1.get("pre2time"),
                "pre3ecg": existing_user1.get("pre2ecg"),
                "pre2time": existing_user1.get("pre1time"),
                "pre2ecg": existing_user1.get("pre1ecg"),
                "pre1time": existing_user1.get("currenttime"),
                "pre1ecg": existing_user1.get("currentecg"),
                "currenttime": current_time.isoformat(),
                "currentecg": current_ecg
            }
            ecg.update_one({"username": username}, {"$set": update_fields})
            print("User data updated")

        else:
            new_document = {
                "username": username,
                "currenttime": current_time.isoformat(),
                "currentecg": current_ecg,
                "pre1time": None,
                "pre1ecg": None,
                "pre2time": None,
                "pre2ecg": None,
                "pre3time": None,
                "pre3ecg": None,
                "pre4time": None,
                "pre4ecg": None,
                "pre5time": None,
                "pre5ecg": None,
                "pre6time": None,
                "pre6ecg": None,
                "pre7time": None,
                "pre7ecg": None,
                "pre8time": None,
                "pre8ecg": None,
                "pre9time": None,
                "pre9ecg": None,
                "pre10time": None,
                "pre10ecg": None,
                "pre11time": None,
                "pre11ecg": None,
                "pre12time": None,
                "pre12ecg": None,
                "pre13time": None,
                "pre13ecg": None,
                "pre14time": None,
                "pre14ecg": None,
                "pre15time": None,
                "pre15ecg": None,
                "pre16time": None,
                "pre16ecg": None,
                "pre17time": None,
                "pre17ecg": None,
                "pre18time": None,
                "pre18ecg": None,
                "pre19time": None,
                "pre19ecg": None,
                "pre20time": None,
                "pre20ecg": None,
                "pre21time": None,
                "pre21ecg": None,
                "pre22time": None,
                "pre22ecg": None,
                "pre23time": None,
                "pre23ecg": None
            }

            ecg.insert_one(new_document)
            print("New user data inserted"),
        
        if existing_user2:
            update_fields = {
                "pre6time": existing_user2.get("pre5time"),
                "pre6sp02": existing_user2.get("pre5sp02"),
                "pre5time": existing_user2.get("pre4time"),
                "pre5sp02": existing_user2.get("pre4sp02"),
                "pre4time": existing_user2.get("pre3time"),
                "pre4sp02": existing_user2.get("pre3sp02"),
                "pre3time": existing_user2.get("pre2time"),
                "pre3sp02": existing_user2.get("pre2sp02"),
                "pre2time": existing_user2.get("pre1time"),
                "pre2sp02": existing_user2.get("pre1sp02"),
                "pre1time": existing_user2.get("currenttime"),
                "pre1sp02": existing_user2.get("currentsp02"),
                "currenttime": current_time.isoformat(),
                "currentsp02": current_sp02,
            }

            bloodpressure.update_one({"username": username}, {"$set": update_fields})
            print("User data updated")
        else:
            new_document = {
                "username": username,
                "currenttime": current_time.isoformat(),
                "currentsp02": current_sp02,
                "pre1time": None,
                "pre1sp02": None,
                "pre2time": None,
                "pre2sp02": None,
                "pre3time": None,
                "pre3sp02": None,
                "pre4time": None,
                "pre4sp02": None,
                "pre5time": None,
                "pre5sp02": None,
                "pre6time": None,
                "pre6sp02": None
            }
            bloodpressure.insert_one(new_document)
            print("New user data inserted")
        
        if existing_user3:
            update_fields = {
                "pre6time": existing_user3.get("pre5time"),
                "pre6heartRate": existing_user3.get("pre5heartRate"),
                "pre6pulseRate": existing_user3.get("pre5pulseRate"),
                "pre5time": existing_user3.get("pre4time"),
                "pre5heartRate": existing_user3.get("pre4heartRate"),
                "pre5pulseRate": existing_user3.get("pre4pulseRate"),
                "pre4time": existing_user3.get("pre3time"),
                "pre4heartRate": existing_user3.get("pre3heartRate"),
                "pre4pulseRate": existing_user3.get("pre3pulseRate"),
                "pre3time": existing_user3.get("pre2time"),
                "pre3heartRate": existing_user3.get("pre2heartRate"),
                "pre3pulseRate": existing_user3.get("pre2pulseRate"),
                "pre2time": existing_user3.get("pre1time"),
                "pre2heartRate": existing_user3.get("pre1heartRate"),
                "pre2pulseRate": existing_user3.get("pre1pulseRate"),
                "pre1time": existing_user3.get("currenttime"),
                "pre1heartRate": existing_user3.get("currentheartRate"),
                "pre1pulseRate": existing_user3.get("currentpulseRate"),
                "currenttime": current_time.isoformat(),
                "currentheartRate": current_heartRate,
                "currentpulseRate": current_pulseRate
            }

            heartandpulse.update_one({"username": username}, {"$set": update_fields})
            print("User data updated")
        else:
            new_document = {
                "username": username,
                "currenttime": current_time.isoformat(),
                "currentheartRate": current_heartRate,
                "currentpulseRate": current_pulseRate,
                "pre1time": None,
                "pre1heartRate": None,
                "pre1pulseRate": None,
                "pre2time": None,
                "pre2heartRate": None,
                "pre2pulseRate": None,
                "pre3time": None,
                "pre3heartRate": None,
                "pre3pulseRate": None,
                "pre4time": None,
                "pre4heartRate": None,
                "pre4pulseRate": None,
                "pre5time": None,
                "pre5heartRate": None,
                "pre5pulseRate": None,
                "pre6time": None,
                "pre6heartRate": None,
                "pre6pulseRate": None
            }
            heartandpulse.insert_one(new_document)
            print("New user data inserted")
    
        return jsonify({"message": "User data inserted"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/predict", methods=["POST"])
def predict():
    try:
        symptoms = request.json.get("symptoms", [])
        print("Received Symptoms:", symptoms)

        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            if symptom in data_dict["symptom_index"]:
                index = data_dict["symptom_index"][symptom]
                input_data[index] = 1
            else:
                error_message = f"Symptom '{symptom}' not found in symptom index."
                print(error_message)
                return jsonify({"error": error_message}), 400

        input_data = np.array(input_data).reshape(1, -1)
        print("Processed Input Data:", input_data)

        rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
        print("Random Forest Prediction:", rf_prediction)
        nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
        print("Naive Bayes Prediction:", nb_prediction)
        svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
        print("SVM Prediction:", svm_prediction)

        final_prediction = statistics.mode([rf_prediction, nb_prediction, svm_prediction])
        print("Final Prediction:", final_prediction)

        return jsonify({
            "rf_model_prediction": rf_prediction,
            "naive_bayes_prediction": nb_prediction,
            "svm_model_prediction": svm_prediction,
            "final_prediction": final_prediction
        })

    except Exception as e:
        import traceback
        print("Error Traceback:", traceback.format_exc())
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)


