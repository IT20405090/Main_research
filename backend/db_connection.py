import pymongo
from dotenv import load_dotenv
import os



load_dotenv()
# Replace the hardcoded connection string with the environment variable
mongo_uri = os.environ.get("MONGODB_URI")

def get_db_connection():
    try:
        # Replace this connection string with your actual MongoDB Atlas connection string
        client = pymongo.MongoClient(mongo_uri)

        db = client["video_database"]
        videos_collection = db["videos"]

        # Check if the collection exists, and create it if it doesn't
        if "videos" not in db.list_collection_names():
            db.create_collection("videos")
        
        print("Connected to MongoDB video_database")
        
        return videos_collection

    except Exception as e:
        print("Error connecting to MongoDB:", e)
        return None
