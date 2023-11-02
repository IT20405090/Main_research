from bson import ObjectId
from flask import Flask, request, jsonify
from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import cv2
from tensorflow.keras.models import load_model
import time
import os
import json
from datetime import datetime
from db_connection import get_db_connection


app = Flask(__name__)
CORS(app) 

# Get the MongoDB collection
videos_collection = get_db_connection()


# Get the current directory of your Python script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Define the relative paths to the directories you want to create
VIDEO_DIR = os.path.join(current_directory, "Predictedvideos")
RECORDED_VIDEO_DIR = os.path.join(current_directory, "recorded_videos")
MODEL_PATH = os.path.join(current_directory, "trainedModel", "LRCN_model.h5")


for directory in [VIDEO_DIR, RECORDED_VIDEO_DIR]:
    if not os.path.exists(directory):
        os.makedirs(directory)


# Load the trained model
model = load_model(MODEL_PATH)

# Class labels for predictions
class_labels = ["Abnormal", "Normal"]

# Specify the height and width to which each video frame will be resized
IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64

# Specify the number of frames of a video that will be fed to the model as one sequence
SEQUENCE_LENGTH = 3


def process_video(video_path):
    frames = []

    # Read the video using OpenCV
    cap = cv2.VideoCapture(video_path)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Resize and normalize the frame
        frame = cv2.resize(frame, (IMAGE_WIDTH, IMAGE_HEIGHT))
        frame = frame / 255.0
        frames.append(frame)

        if len(frames) == SEQUENCE_LENGTH:
            break

    cap.release()

    return frames



@app.route('/process_video', methods=['POST'])
def process_video_endpoint():
    try:
        # Receive the uploaded video file
        uploaded_file = request.files['video']

        # Generate a unique video filename based on the current timestamp
        video_filename = f"video_{time.strftime('%Y%m%d%H%M%S')}.mp4"

        # Save the video to a temporary file
        video_path = os.path.join(VIDEO_DIR, video_filename)
        uploaded_file.save(video_path)

        # Process the video and make predictions
        frames = process_video(video_path)

        if len(frames) == SEQUENCE_LENGTH:
            # Make predictions
            prediction = make_prediction(frames)

            return jsonify({"prediction": class_labels[prediction], "video_filename": video_filename})
        else:
            return jsonify({"error": "Video does not have enough frames for processing."})
        
    except Exception as e:
        return jsonify({"error": str(e)})



def make_prediction(frames):
    frames_array = np.array(frames)

    # Ensure the frames array has the expected shape
    if frames_array.shape != (SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH, 3):
        return None  # Handle the case where frames are not in the expected shape

    # Expand the dimensions of the frames array to match the model input shape
    frames_array = np.expand_dims(frames_array, axis=0)

    # Make predictions using the loaded model
    predictions = model.predict(frames_array)

    # Get the predicted class index (0 for "Abnormal", 1 for "Normal")
    predicted_class_index = np.argmax(predictions)

    return predicted_class_index



## to save video recording
@app.route('/save_video', methods=['POST'])
def save_video():
    try:
        data = request.get_json()
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        duration = data.get('duration')
        video_file_path = data.get('video_file_path')

      # Save video details to MongoDB
        video_data = {
            'start_time': start_time,
            'end_time': end_time,
            'duration': duration,
            'video_file_path': video_file_path
        }
        video_id = videos_collection.insert_one(video_data).inserted_id

        return jsonify({"message": "Video details saved to MongoDB", "video_id": str(video_id)})
    except Exception as e:
        return jsonify({"error": str(e)})


# get all videos
@app.route('/get_videos', methods=['GET'])
def get_videos():
    try:
        video_details = list(videos_collection.find({}, {'_id': 0}))
        return jsonify(video_details)
    except Exception as e:
        return jsonify({"error": str(e)})
    


@app.route('/delete_video/<int:index>', methods=['DELETE'])
def delete_video(index):
    try:
        # Find the video by its index and delete it
        videos = list(videos_collection.find({}, {'_id': 1}))
        if 0 <= index < len(videos):
            video_id = videos[index]['_id']
            deleted_video = videos_collection.find_one_and_delete({"_id": video_id})
            if deleted_video:
                return jsonify({"message": "Video deleted successfully", "deleted_video": deleted_video})
            else:
                return jsonify({"message": "Video not found"})
        else:
            return jsonify({"message": "Video index out of bounds"})
    except Exception as e:
        return jsonify({"error": str(e)})






# Endpoint to save video details to the database
@app.route('/save_video_details', methods=['POST'])
def save_video_details():
    try:
        data = request.get_json()

        # Get video details from the request
        video_id = data.get('videoId')
        result = data.get('result')
        video_size = data.get('videoSize')
        prediction_date = data.get('predictionDate')

        # Create a dictionary to save in the database
        video_data = {
            'video_id': video_id,
            'result': result,
            'video_size': video_size,
            'prediction_date': prediction_date,
        }

        # Save video details to the "prediction_details" collection
        video_details_collection = videos_collection["prediction_details"]
        video_details_collection.insert_one(video_data)

        return jsonify({"message": "Video details saved to the database", "video_id": video_id})
    except Exception as e:
        return jsonify({"error": str(e)})
    


@app.route('/prediction_history', methods=['GET'])
def prediction_history():
    try:
        # Query the "prediction_details" collection to get prediction history
        prediction_details_collection = videos_collection["prediction_details"]
        history_data = list(prediction_details_collection.find({}, {'_id': 0}))

        return jsonify(history_data)
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == '__main__':
    app.run()













