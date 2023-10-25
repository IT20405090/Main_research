from flask import Flask, request, jsonify
from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import cv2
from tensorflow.keras.models import load_model
import time
from datetime import datetime
from db_connection import get_db_connection


app = Flask(__name__)
CORS(app) 

# Get the MongoDB collection
videos_collection = get_db_connection()



# Define the directory where you want to save uploaded videos
VIDEO_DIR = "D:\python\ReactResearch"

RECORDED_VIDEO_DIR = "D:/python/ReactResearch/recorded_videos"

# Load the trained model
model = load_model("D:\model training videos\model_video_2\LRCN_model___Date_Time_2023_08_29__14_20_04___Loss_0.3715948760509491___Accuracy_0.8095238208770752.h5")
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
    

@app.route('/get_videos', methods=['GET'])
def get_videos():
    try:
        video_details = list(videos_collection.find({}, {'_id': 0}))
        return jsonify(video_details)
    except Exception as e:
        return jsonify({"error": str(e)})
    





@app.route('/videos/<filename>')
def serve_video(filename):
    video_directory = RECORDED_VIDEO_DIR 
    return send_from_directory(video_directory, filename)


if __name__ == '__main__':
    app.run()
