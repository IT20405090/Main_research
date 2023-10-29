import pymongo

def get_db_connection():
    try:
        # Replace this connection string with your actual MongoDB Atlas connection string
        atlas_connection_string = "mongodb+srv://Anodya:Anodya123@cluster0.ta3qef8.mongodb.net/?retryWrites=true&w=majority"
        client = pymongo.MongoClient(atlas_connection_string)

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
