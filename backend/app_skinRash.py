import os
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import pymongo
from bson import ObjectId
from flask_cors import CORS
# Import the Flask Blueprint class
from flask import Blueprint



skin_rash_app = Flask(__name__, static_url_path='/static')

CORS(skin_rash_app)  # Enable CORS for the skin_rash_app

UPLOAD_FOLDER = 'static/uploads'


skin_rash_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize MongoDB client
client = pymongo.MongoClient("mongodb+srv://it20147778:7wyoo1sUIJUVx4eN@cluster0.dejmxcz.mongodb.net/RashPredictDB?retryWrites=true&w=majority")
db = client["RashPredictDB"]
collection = db["RashPredict"]

# Define a function to load your skin rash classification model
def load_skin_rash_model(model_path):
    model = load_model(model_path)
    return model

# Load the models when the app starts
normal_abnormal_model = load_skin_rash_model('model/skin_rash_model2.h5')
skin_rash_type_model = load_skin_rash_model('model/skin_rash_model.h5')

# Function to preprocess the uploaded image
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize pixel values
    return img

# Function to predict normal/abnormal skin
def predict_normal_abnormal_skin(image_path):
    img = preprocess_image(image_path)
    prediction = normal_abnormal_model.predict(img)
    predicted_class = np.argmax(prediction, axis=1)
    return predicted_class

# Function to predict the type of skin rash
def predict_skin_rash_type(image_path):
    img = preprocess_image(image_path)
    prediction = skin_rash_type_model.predict(img)
    predicted_class = np.argmax(prediction, axis=1)
    return predicted_class

# Route for normal/abnormal skin prediction
@skin_rash_app.route("/predict_normal_abnormal_skin", methods=["POST"])
def predict_normal_abnormal_skin_route():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No image selected. Please choose an image."}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        predicted_class = predict_normal_abnormal_skin(file_path)
        skin_rash_types = ["Normal Skin", "Abnormal Skin"]
        predicted_type = skin_rash_types[predicted_class[0]]
        
        # Rename the file with prediction result
        filename_with_prediction = f"{os.path.splitext(filename)[0]}_{predicted_type}{os.path.splitext(filename)[1]}"
        new_file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename_with_prediction)
        os.rename(file_path, new_file_path)

        return jsonify({"image_filename": filename_with_prediction, "skin_rash_type": predicted_type})


    return jsonify({"error": "Invalid request."}), 400

# Route for skin rash type prediction
@skin_rash_app.route("/predict_skin_rash_type", methods=["POST"])
def predict_skin_rash_type_route():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No image selected. Please choose an image."}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        predicted_class = predict_skin_rash_type(file_path)
        skin_rash_types = [
            "Atopic Dermatitis",
            "Bullous Disease",
            "Cellulitis Impetigo and other Bacterial Infections",
            "Eczema",
            "Exanthems and Drug Eruptions",
            "Normal Skin",
            "Urticaria Hives"
            
        ]
        predicted_type = skin_rash_types[predicted_class[0]]
        
          # Rename the file with prediction result
        filename_with_prediction = f"{os.path.splitext(filename)[0]}_{predicted_type}{os.path.splitext(filename)[1]}"
        new_file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename_with_prediction)
        os.rename(file_path, new_file_path)

        return jsonify({"image_filename": filename_with_prediction, "skin_rash_type": predicted_type})


    return jsonify({"error": "Invalid request."}), 

# Route to list image files in the "uploads" directory
@skin_rash_app.route('/list-images')
def list_images():
    upload_path = skin_rash_app.config['UPLOAD_FOLDER']
    images = [filename for filename in os.listdir(upload_path) if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify({'images': images})

 
# New route to delete an image
@skin_rash_app.route("/delete-image/<filename>", methods=["DELETE"])
def delete_image(filename):
    file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({"message": "Image deleted successfully."})
    return jsonify({"error": "Image not found."}), 404

# New route to download an image
@skin_rash_app.route("/download-image/<filename>")
def download_image(filename):
    file_path = os.path.join(skin_rash_app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        return send_from_directory(skin_rash_app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    return jsonify({"error": "Image not found."}), 404


if __name__ == "__main__":
    skin_rash_app.run(debug=True, port=5001)
