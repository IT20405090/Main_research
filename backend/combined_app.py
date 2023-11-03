# disni - Chatbot
from flask import Flask, request, jsonify, json
import long_responses as long
from flask_cors import CORS, cross_origin
import re
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# disni - Skin rasha predictor

import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import tensorflow as tf
from bson import ObjectId


# ramona
from database import get_milestone_data, insert_milestone_data, update_milestone_data
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from datetime import datetime

# anodya
from PIL import Image
import cv2
import time
from db_connection import get_db_connection

# Get the MongoDB collection - anodya
videos_collection = get_db_connection()


load_dotenv()
# Replace the hardcoded connection string with the environment variable
mongo_uri = os.environ.get("MONGODB_URI")

# Initialize the MongoDB client with the environment variable
client = MongoClient(mongo_uri)
db = client["ReactChatBotDB"]  
chat_collection = db["Chats"]

db = client["growth_prediction"]
collection = db["new_predictions"]


# Disni Backend Parts - Chatbot
# Initialize conversation_id and conversation_messages
conversation_id = None
conversation_messages = []


# Function to save a conversation to MongoDB
def save_conversation( messages):
    conversation = {
     
        "messages": messages,
        
    }
    chat_collection.insert_one(conversation)



app = Flask(__name__,static_url_path='/static')
CORS(app) 

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow cross-origin requests from your React app

# Explicitly allow the DELETE method for the /api/deleteConversation route
CORS(app, resources={r"/api/deleteConversation/*": {"origins": "http://localhost:3000", "methods": ["DELETE"]}})


# Your existing code for message_probability, check_all_messages, and get_response

def message_probability(user_message, recognised_words, single_response=False, required_words=[]):
    # Your message_probability code here
    message_certainty = 0
    has_required_words = True

    # Counts how many words are present in each predefined message
    for word in user_message:
        if word in recognised_words:
            message_certainty += 1

    # Calculates the percent of recognised words in a user message
    percentage = float(message_certainty) / float(len(recognised_words))

    # Checks that the required words are in the string
    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break

    # Must either have the required words, or be a single response
    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0


def check_all_messages(message):
    # Your check_all_messages code here
    highest_prob_list = {}

    # Simplifies response creation / adds it to the dict
    def response(bot_response, list_of_words, single_response=False, required_words=[]):
        nonlocal highest_prob_list
        highest_prob_list[bot_response] = message_probability(message, list_of_words, single_response, required_words)


# Example of using the modified response function
    # response("Goodbye!", "See you later", single_response=True)

    # Responses -------------------------------------------------------------------------------------------------------
    response('Hello! How can I help/assist you today 😊 ?', ['hello', 'hi', 'hey', 'sup', 'heyo','hy'], single_response=True)
    response('See you!', ['bye', 'goodbye'], single_response=True)
    response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'], required_words=['how','are','you'])
    response('You\'re welcome! Have a great day/night! ', ['thankyou', 'thanks'], single_response=True)
    response('Thank you!', ['i', 'like', 'this', 'chatbot','love','good','job'], required_words=['chatbot', 'i'])
    response('exit from the chatbot', ['exit'], required_words=['exit'])

    # Longer responses

    #common problems asked from parents
    #Food/Eating
    response(long.R_EATING, ['what', 'my','baby','eat','feed','meal','meals','food'], required_words=['what','meal'])
    response(long.R_ADVICE_FEEDING, ['feeding', 'baby','place','how','feed'], required_words=['how', 'feed'])
    response(long.R_DIET, ['when', 'introduce', 'give', 'solid', 'foods'], required_words=['when', 'solid','foods'])
    response(long.R_DIET_TIME_M0, ['when', 'time', 'give', 'foods','food','0', 'month'], required_words=[ 'food','time','0' ,'month'])
    response(long.R_DIET_TIME_M1, ['when', 'time', 'give', 'foods','food','1', 'month'], required_words=[ 'food','time', '1', 'month'])
    response(long.R_DIET_TIME_M2, ['when', 'time', 'give', 'foods','food','2', 'month'], required_words=[ 'food','time','2' ,'month'])
    response(long.R_DIET_TIME_M3, ['when', 'time', 'give', 'foods','food', '3', 'month'], required_words=[ 'food','time','3' ,'month'])
    response(long.R_DIET_TIME_M4, ['when', 'time', 'give', 'foods','food','4', 'month'], required_words=[ 'food','time','4' ,'month'])
    response(long.R_DIET_TIME_M5, ['when', 'time', 'give', 'foods','food', '5', 'month'], required_words=[ 'food','time','5' ,'month'])
    response(long.R_DIET_TIME_M6, ['when', 'time', 'give', 'foods','food', '6', 'month'], required_words=[ 'food','time','6' ,'month'])
    response(long.R_DIET_TIME_M7, ['when', 'time', 'give', 'foods','food', '7', 'month'], required_words=[ 'food','time','7' ,'month'])
    response(long.R_DIET_TIME_M8, ['when', 'time', 'give', 'foods','food', '8', 'month'], required_words=[ 'food','time','8' ,'month'])
    response(long.R_DIET_TIME_M9, ['when', 'time', 'give', 'foods','food', '9', 'month'], required_words=[ 'food','time','9' ,'month'])
    response(long.R_DIET_TIME_M10, ['when', 'time', 'give', 'foods','food', '10' ,'month'], required_words=[ 'food','time','10' ,'month'])
    response(long.R_DIET_TIME_M11, ['when', 'time', 'give', 'foods','food', '11' , 'month'], required_words=[ 'food','time','11' ,'month'])
    response(long.R_DIET_TIME_M12, ['when', 'time', 'give', 'foods','food', '12', 'month'], required_words=[ 'food','time','12' ,'month'])


    response(long.R_TUMMY_TIME, ['why', 'tummy', 'time', 'important'], required_words=['why', 'tummy', 'time', 'important'])
    response(long.R_ALLERGIES, ['how', 'introduce', 'solid', 'foods'], required_words=['how', 'introduce', 'solid', 'foods'])
    response(long.R_FOOD_INTRODUCTION, ['when', 'start', 'feeding', 'solids'], required_words=['when', 'start', 'feeding', 'solids'])
    response(long.R_BOTTLE_WEANING, ['when', 'transition', 'bottle', 'sippy', 'cup'], required_words=['when', 'transition', 'bottle', 'sippy', 'cup'])
    response(long.R_ADVICE_TUMMY_TIME, ['how', 'make', 'tummy', 'time'], required_words=['how', 'make', 'tummy', 'time'])



    #sleeping
    response(long.R_SLEEP, ['how', 'much', 'sleep'], required_words=['how', 'much', 'sleep'])
    response(long.R_ADVICE_SLEEP, ['sleep', 'routine'], required_words=['sleep', 'routine'])


    response(long.R_DIAPER, ['how', 'often', 'change', 'diaper'], required_words=['how', 'often', 'change', 'diaper'])
    response(long.R_FUSSY, ['why', 'baby', 'fussy'], required_words=['why', 'baby', 'fussy'])
    response(long.R_TEETHING, ['when', 'start', 'teething'], required_words=['when', 'start', 'teething'])
    
    response(long.R_VACCINATIONS, ['why', 'vaccinations', 'important'], required_words=['why', 'vaccinations', 'important'])
    response(long.R_FEVER, ['what', 'do', 'fever'], required_words=['fever'])
   
    response(long.R_BATHING, ['how', 'bathe', 'baby'], required_words=['how', 'bathe', 'baby'])
    
    response(long.R_CRAWLING, ['when', 'start', 'crawling'], required_words=['when', 'start', 'crawling'])
    response(long.R_PLAY, ['why', 'playtime', 'important'], required_words=['why', 'playtime', 'important'])
    response(long.R_FEVERS, ['what', 'do', 'fever'], required_words=['what', 'do', 'fever'])
    response(long.R_SKIN_CARE, ['how', 'care', 'baby', 'skin'], required_words=['how', 'care', 'baby', 'skin'])
    response(long.R_RESPONSIVE, ['how', 'comfort', 'baby', 'crying'], required_words=['how', 'comfort', 'baby', 'crying'])
    response(long.R_CRYING, ['why', 'baby', 'cry'], required_words=['why', 'baby', 'cry'])
    
    response(long.R_DEVELOPMENT, ['how', 'baby', 'develop', 'milestones'], required_words=['how', 'baby', 'develop', 'milestones'])
    response(long.R_SPIT_UP, ['why', 'baby', 'spit', 'up'], required_words=['why', 'baby', 'spit', 'up'])
    
    response(long.R_SAFETY, ['how', 'baby-proof', 'home'], required_words=['how', 'baby-proof', 'home'])
    
    response(long.R_DIAPER_RASH, ['how', 'treat', 'diaper', 'rash'], required_words=['how', 'treat', 'diaper', 'rash'])
    response(long.R_BONDING, ['how', 'bond', 'baby'], required_words=['how', 'bond', 'baby'])
   
    response(long.R_SCREEN_TIME, ['how', 'limit', 'screen', 'time'], required_words=['how', 'limit', 'screen', 'time'])
    
    response(long.R_LANGUAGE_DEV, ['how', 'promote', 'language', 'development'], required_words=['how', 'promote', 'language', 'development'])
    response(long.R_IMMUNIZATION, ['why', 'important', 'immunization'], required_words=['why', 'important', 'immunization'])
    response(long.R_CRADLE_CAP, ['what', 'cradle', 'cap'], required_words=['what', 'cradle', 'cap'])
    response(long.R_SICKNESS_SIGN, ['signs', 'baby', 'sickness'], required_words=['signs', 'baby', 'sickness'])
    response(long.R_OUTDOOR_TIME, ['benefits', 'outdoor', 'time'], required_words=['benefits', 'outdoor', 'time'])

    #problems related to skin

    response(long.R_SKIN_SENSITIVITY, ['how', 'care', 'sensitive', 'skin'], required_words=['how', 'care', 'sensitive', 'skin'])
    response(long.R_BATHING_SKIN, ['how', 'bathe', 'baby', 'skin'], required_words=['how', 'bathe', 'baby', 'skin'])
    response(long.R_SUN_PROTECTION, ['how', 'protect', 'baby', 'sun'], required_words=['how', 'protect', 'baby', 'sun'])
    response(long.R_DIAPER_RASH_PREVENTION, ['how', 'prevent', 'diaper', 'rash'], required_words=['how', 'prevent', 'diaper', 'rash'])
    response(long.R_ECZEMA, ['what', 'do', 'baby', 'eczema'], required_words=['what', 'do', 'baby', 'eczema'])
    response(long.R_CLOTHING_MATERIAL, ['what', 'choose', 'baby', 'clothing'], required_words=['what', 'choose', 'baby', 'clothing'])
    response(long.R_MASSAGE, ['how', 'massage', 'baby'], required_words=['how', 'massage', 'baby'])
    response(long.R_RASH_IDENTIFICATION, ['how', 'identify', 'baby', 'rashes'], required_words=['how', 'identify', 'baby', 'rashes'])
    
    response(long.R_RINGWORM, ['what', 'ringworm'], required_words=['what', 'ringworm'])
    response(long.R_MILIA, ['what', 'milia'], required_words=['what', 'milia'])
    response(long.R_PETECHIAE, ['what', 'petechiae'], required_words=['what', 'petechiae'])
    response(long.R_MONGOLIAN_SPOTS, ['what', 'mongolian', 'spots'], required_words=['what', 'mongolian', 'spots'])
    response(long.R_HIVES, ['what', 'hives'], required_words=['what', 'hives'])

    response(long.R_IMPETIGO, ['what', 'is', 'impetigo'], required_words=['what', 'is', 'impetigo'])
    response(long.R_PUSTULES, ['what', 'are', 'pustules'], required_words=['what', 'are', 'pustules'])
    response(long.R_STRABERRY_HEMANGIOMA, ['what', 'is', 'strawberry', 'hemangioma'], required_words=['what', 'is', 'strawberry', 'hemangioma'])
    response(long.R_DRY_SKIN, ['how', 'treat', 'dry', 'skin'], required_words=['how', 'treat', 'dry', 'skin'])
    response(long.R_SCABIES, ['what', 'is', 'scabies'], required_words=['what', 'is', 'scabies'])
    response(long.R_RINGWORM, ['what', 'is', 'ringworm'], required_words=['what', 'is', 'ringworm'])
    
    #skin problem based on parents view
    response(long.R_RED_RASH_ON_BODY, ['red', 'rash', 'body'], required_words=['red', 'rash', 'body'])
    response(long.R_WHITE_BUMPS_ON_FACE, ['white', 'bumps', 'face'], required_words=['white', 'bumps', 'face'])
    response(long.R_BLUISH_MARKS_ON_LOWER_BACK, ['bluish', 'marks', 'lower', 'back'], required_words=['bluish', 'marks', 'lower', 'back'])
    response(long.R_YELLOW_CRUST_ON_SCALP, ['yellow', 'crust', 'scalp'], required_words=['yellow', 'crust', 'scalp'])
    response(long.R_SMALL_BLISTERS_ON_HANDS, ['small', 'blisters', 'hands'], required_words=['small', 'blisters', 'hands'])

    response(long.R_RING_SHAPED_RASH_ON_SKIN, ['ring-shaped', 'rash', 'skin'], required_words=['ring-shaped', 'rash', 'skin'])
    response(long.R_RED_BUMPS_ON_DIAPER_AREA, ['red', 'bumps', 'diaper', 'area'], required_words=['red', 'bumps', 'diaper', 'area'])
    response(long.R_RED_ITCHY_RASH_SPREADING, ['red', 'itchy', 'rash', 'spreading'], required_words=['red', 'itchy', 'rash', 'spreading'])
    response(long.R_RED_RASH_ON_CHEEKS, ['red', 'rash', 'cheeks'], required_words=['red', 'rash', 'cheeks'])
    response(long.R_SMALL_RED_SPOTS_ON_BODY, ['small', 'red', 'spots', 'body'], required_words=['small', 'red', 'spots', 'body'])
    
    response(long.R_RAISED_BUMPS_ON_ARMS, ['raised', 'bumps', 'arms'], required_words=['raised', 'bumps', 'arms'])
    response(long.R_PINKISH_RED_RASH_WITH_FEVER, ['pinkish', 'red', 'rash', 'fever'], required_words=['pinkish', 'red', 'rash', 'fever'])
    response(long.R_RED_PATCHES_WITH_FLAKING, ['red', 'patches', 'flaking'], required_words=['red', 'patches', 'flaking'])
    response(long.R_SMALL_WHITE_PATCHES_ON_TONGUE, ['small', 'white', 'patches', 'tongue'], required_words=['small', 'white', 'patches', 'tongue'])
    response(long.R_RED_SWOLLEN_EYES_WITH_DISCHARGE, ['red', 'swollen', 'eyes', 'discharge'], required_words=['red', 'swollen', 'eyes', 'discharge'])
    
    response(long.R_RAISED_ITCHY_BUMPS_ON_LEGS, ['raised', 'itchy', 'bumps', 'legs'], required_words=['raised', 'itchy', 'bumps', 'legs'])
    response(long.R_RED_RAISED_RASH_ON_BUTTOCKS, ['red', 'raised', 'rash', 'buttocks'], required_words=['red', 'raised', 'rash', 'buttocks'])
    response(long.R_SMALL_PIMPLES_ON_NECK, ['small', 'pimples', 'neck'], required_words=['small', 'pimples', 'neck'])
    response(long.R_SPREADING_RED_RASH_ON_BODY, ['spreading', 'red', 'rash', 'body'], required_words=['spreading', 'red', 'rash', 'body'])
    response(long.R_FLAT_RED_MARKS_ON_FACE, ['flat', 'red', 'marks', 'face'], required_words=['flat', 'red', 'marks', 'face'])
    
    response(long.R_BLISTER_LIKE_RASH_ON_HANDS, ['blister', 'like', 'rash', 'hands'], required_words=['blister', 'like', 'rash', 'hands'])
    response(long.R_WHITE_PATCHES_ON_SKIN, ['white', 'patches', 'skin'], required_words=['white', 'patches', 'skin'])
    response(long.R_RED_PATCHES_ON_ELBOWS_AND_KNEES, ['red', 'patches', 'elbows', 'knees'], required_words=['red', 'patches', 'elbows', 'knees'])
    response(long.R_RED_RASH_WITH_SWELLING_ON_FACE, ['red', 'rash', 'swelling', 'face'], required_words=['red', 'rash', 'swelling', 'face'])
    response(long.R_RED_RASH_WITH_SMALL_BUMPS_ON_FACE, ['red', 'rash', 'small', 'bumps', 'face'], required_words=['red', 'rash', 'small', 'bumps', 'face'])
    
    response(long.R_BRIGHT_RED_RASH_ON_CHEST, ['bright', 'red', 'rash', 'chest'], required_words=['bright', 'red', 'rash', 'chest'])
    response(long.R_SCALY_PATCHES_ON_SCALP, ['scaly', 'patches', 'scalp'], required_words=['scaly', 'patches', 'scalp'])
    response(long.R_BLISTERS_ON_MOUTH_AND_HANDS, ['blisters', 'mouth', 'hands'], required_words=['blisters', 'mouth', 'hands'])
    response(long.R_FLAT_RED_MARKS_ON_BACK, ['flat', 'red', 'marks', 'back'], required_words=['flat', 'red', 'marks', 'back'])
    response(long.R_RED_RASH_ON_GROIN, ['red', 'rash', 'groin'], required_words=['red', 'rash', 'groin'])
    response(long.R_PIMPLE_LIKE_RASH_ON_ARMS, ['pimple', 'like', 'rash', 'arms'], required_words=['pimple', 'like', 'rash', 'arms'])

    response(long.R_RED_PATCHES_WITH_PUS_ON_LEGS, ['red', 'patches', 'pus', 'legs'], required_words=['red', 'patches', 'pus', 'legs'])
    response(long.R_RAISED_RED_RASH_ON_BACK, ['raised', 'red', 'rash', 'back'], required_words=['raised', 'red', 'rash', 'back'])
    response(long.R_ITCHY_BUMPS_ON_ARMS_AND_LEGS, ['itchy', 'bumps', 'arms', 'legs'], required_words=['itchy', 'bumps', 'arms', 'legs'])
    response(long.R_SPREADING_RASH_WITH_PINK_BUMPS, ['spreading', 'rash', 'pink', 'bumps'], required_words=['spreading', 'rash', 'pink', 'bumps'])
    response(long.R_RED_PATCHES_ON_BABYS_SCALP, ['red', 'patches', 'baby', 'scalp'], required_words=['red', 'patches', 'baby', 'scalp'])
    response(long.R_RED_RASH_ON_FACE_AND_CHEST, ['red', 'rash', 'face', 'chest'], required_words=['red', 'rash', 'face', 'chest'])
    response(long.R_SMALL_BUMPS_WITH_CLEAR_FLUID, ['small', 'bumps', 'clear', 'fluid'], required_words=['small', 'bumps', 'clear', 'fluid'])
    response(long.R_BLUISH_MARKS_WITH_NO_PAIN, ['bluish', 'marks', 'no', 'pain'], required_words=['bluish', 'marks', 'no', 'pain'])
    response(long.R_RAISED_RASH_ON_ARMPITS_AND_GROIN, ['raised', 'rash', 'armpits', 'groin'], required_words=['raised', 'rash', 'armpits', 'groin'])
    

    #advice for parents
 
    
    response(long.R_ADVICE_DIAPERING, ['diaper', 'change'], required_words=['diaper', 'change'])
    response(long.R_ADVICE_BONDING, ['bonding', 'baby'], required_words=['bonding', 'baby'])
    response(long.R_ADVICE_SELF_CARE, ['self', 'care'], required_words=['self', 'care'])
    response(long.R_ADVICE_SUPPORT_NETWORK, ['support', 'network'], required_words=['support', 'network'])
    response(long.R_ADVICE_MENTAL_HEALTH, ['mental', 'health'], required_words=['mental', 'health'])
   
    response(long.R_ADVICE_CELEBRATE_MILESTONES, ['celebrate', 'milestones'], required_words=['celebrate', 'milestones'])
   
    response(long.R_ADVICE_PLAYTIME, ['importance', 'playtime'], required_words=['importance', 'playtime'])
    response(long.R_ADVICE_LIMIT_VISITORS, ['how', 'limit', 'visitors'], required_words=['how', 'limit', 'visitors'])
    response(long.R_ADVICE_RESPONSIVE, ['respond', 'baby', 'cries'], required_words=['respond', 'baby', 'cries'])
    response(long.R_ADVICE_RELAXATION, ['relaxation', 'techniques'], required_words=['relaxation', 'techniques'])
    response(long.R_ADVICE_COMMUNICATION, ['openly', 'communicate', 'partner'], required_words=['openly', 'communicate', 'partner'])
    response(long.R_ADVICE_PARENTING_CLASSES, ['attend', 'parenting', 'classes'], required_words=['attend', 'parenting', 'classes'])
    response(long.R_ADVICE_SEEK_HELP, ['feel', 'overwhelmed', 'seek', 'help'], required_words=['feel', 'overwhelmed', 'seek', 'help'])
    response(long.R_ADVICE_OUTDOOR_TIME, ['spending', 'time', 'outdoors'], required_words=['spending', 'time', 'outdoors'])
    response(long.R_ADVICE_FAMILY_TIME, ['include', 'baby', 'family', 'activities'], required_words=['include', 'baby', 'family', 'activities'])
    response(long.R_ADVICE_PATIENCE, ['patience', 'key', 'parenting'], required_words=['patience', 'key', 'parenting'])
    response(long.R_ADVICE_CELEBRATE_YOURSELF, ['celebrate', 'achievements', 'parent'], required_words=['celebrate', 'achievements', 'parent'])
    response(long.R_ADVICE_HEALTHY_EATING, ['prioritize', 'healthy', 'eating'], required_words=['prioritize', 'healthy', 'eating'])
    response(long.R_ADVICE_DATE_NIGHT, ['plan', 'date', 'night'], required_words=['plan', 'date', 'night'])
    response(long.R_ADVICE_BREAK_TASKS, ['break', 'tasks', 'smaller', 'steps'], required_words=['break', 'tasks', 'smaller', 'steps'])
    response(long.R_ADVICE_LAUGH_TOGETHER, ['laughter', 'stress-reliever'], required_words=['laughter', 'stress-reliever'])
    

    best_match = max(highest_prob_list, key=highest_prob_list.get)

    # print(f'Best match = {best_match} | Score: {highest_prob_list[best_match]}')

    return long.unknown() if highest_prob_list[best_match] < 1 else best_match



# Used to get the response
def get_response(user_input):
    # Convert user input to lowercase
    user_input = user_input.lower()
    
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input)
    response = check_all_messages(split_message)
    return response

# Create an empty list to store conversation history
conversation_history = []

# Define a function to save conversations to MongoDB
def save_conversation(user_message, bot_response):
    conversation = {
        "user_message": user_message,
        "bot_response": bot_response
    }
    chat_collection.insert_one(conversation)


# Chat route for receiving user input and sending responses
@app.route("/api/chat", methods=["POST"])
@cross_origin()
def chat():
    
    user_message = request.json.get("message")
        

    # Check if the user wants to exit the conversation
    if user_message.lower() == 'exit':
        # Save the entire conversation under one object ID
        if conversation_messages:
            conversation = {
                "conversation": conversation_messages
            }
            chat_collection.insert_one(conversation)
            # Clear the conversation_messages list
            conversation_messages.clear()
        # Respond with an exit message
        response = "exit from the chatbot"
    else:
        # Get the bot's response
        bot_response = get_response(user_message)
        # Append the user's message and bot's response to the ongoing conversation
        conversation_messages.append({"user": user_message, "bot": bot_response})
        # Respond with the bot's response
        response = bot_response

    return jsonify({"response": response})
    


# to view the chats 
@app.route('/api/getChats', methods=['GET'])
def get_conversations():
    conversations = list(chat_collection.find({}, {"_id": 0, "conversation": 1}))

    formatted_conversations = []

    for conversation in conversations:
        if 'conversation' in conversation:  # Check if 'conversation' key exists
            formatted_conversation = []
            for message in conversation['conversation']:
                user = "User" if conversation["conversation"].index(message) % 2 == 0 else "Bot"
                formatted_conversation.append({"text": message, "user": user})
            formatted_conversations.append(formatted_conversation)
            
        else:
            # Handle cases where the 'conversation' key is missing or incorrect
            # You can log the error or take appropriate action
            pass

    return jsonify({'conversations': formatted_conversations})


#to delete chats
@app.route('/api/deleteConversation/<int:index>', methods=['DELETE'])
def delete_conversation(index):
    global chat_collection

    # Retrieve the _id of the conversation at the specified index
    conversations = list(chat_collection.find({}, {"_id": 1}))
    if index < len(conversations):
        conversation_id = conversations[index]["_id"]

        # Attempt to delete the conversation using the _id
        deleted_result = chat_collection.delete_one({"_id": conversation_id})

        if deleted_result.deleted_count > 0:
            return jsonify({"message": "Conversation deleted"})
        else:
            return jsonify({"message": "Conversation not found"}, 404)
    else:
        return jsonify({"message": "Invalid index"}, 400)



# End of Chatbot parts

# Start of skin rashes part



# CORS(app)  # Enable CORS for the app

UPLOAD_FOLDER = 'static/uploads'


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


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
@app.route("/predict_normal_abnormal_skin", methods=["POST"])
@cross_origin()  # Allow cross-origin requests for this route
def predict_normal_abnormal_skin_route():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No image selected. Please choose an image."}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        predicted_class = predict_normal_abnormal_skin(file_path)
        skin_rash_types = ["Normal Skin", "Abnormal Skin"]
        predicted_type = skin_rash_types[predicted_class[0]]
        
        # Rename the file with prediction result
        filename_with_prediction = f"{os.path.splitext(filename)[0]}_{predicted_type}{os.path.splitext(filename)[1]}"
        new_file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename_with_prediction)
        os.rename(file_path, new_file_path)

        return jsonify({"image_filename": filename_with_prediction, "skin_rash_type": predicted_type})


    return jsonify({"error": "Invalid request."}), 400

# Route for skin rash type prediction
@app.route("/predict_skin_rash_type", methods=["POST"])
@cross_origin()  # Allow cross-origin requests for this route
def predict_skin_rash_type_route():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No image selected. Please choose an image."}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
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
        new_file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename_with_prediction)
        os.rename(file_path, new_file_path)

        return jsonify({"image_filename": filename_with_prediction, "skin_rash_type": predicted_type})


    return jsonify({"error": "Invalid request."}), 

# Route to list image files in the "uploads" directory
@app.route('/list-images')
@cross_origin()  # Allow cross-origin requests for this route
def list_images():
    upload_path = app.config['UPLOAD_FOLDER']
    images = [filename for filename in os.listdir(upload_path) if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify({'images': images})

 
# New route to delete an image
@app.route("/delete-image/<filename>", methods=["DELETE"])
@cross_origin()  # Allow cross-origin requests for this route
def delete_image(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({"message": "Image deleted successfully."})
    return jsonify({"error": "Image not found."}), 404

# New route to download an image
@app.route("/download-image/<filename>")
@cross_origin()  # Allow cross-origin requests for this route
def download_image(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    return jsonify({"error": "Image not found."}), 404

# end of skin rashes









#ramona- growth level prediction


@app.route('/get_milestone', methods=['GET'])
@cross_origin()  # Allow cross-origin requests for this route

def get_milestone():
    age = request.args.get('age')
    milestone_data = get_milestone_data(age)
    
    # Convert ObjectId to string for JSON serialization
    if milestone_data and '_id' in milestone_data:
        milestone_data['_id'] = str(milestone_data['_id'])
        
    return jsonify(milestone_data)


@app.route('/insert_milestone', methods=['POST'])
@cross_origin()  # Allow cross-origin requests for this route

def insert_milestone():
    data = request.json
    insert_milestone_data(data['age'], data['emotional'], data['language'], data['cognitive'], data['physical'])
    return jsonify({'message': 'Milestone data added successfully'})

@app.route('/update_milestone', methods=['PUT'])
@cross_origin()  # Allow cross-origin requests for this route

def update_milestone():
    data = request.json
    age = data['age']
    update_milestone_data(age, data['emotional'], data['language'], data['cognitive'], data['physical'])
    return jsonify({'message': 'Milestone data updated successfully'})



# Load the trained model using pickle
with open('child_growth_classifier.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Create label encoders for categorical variables
label_encoders = {}  # Initialize an empty dictionary to store label encoders






# Define the categorical columns
categorical_cols = [
    'gross_motor', 'fine_motor', 'communication', 'problem_solving', 'emotional_dev', 'attention',
    'overactivity', 'passivity', 'planning', 'perception', 'perception_vf', 'memory', 'spoken',
    'reading', 'social_skills', 'emotional_prob'
]

# Add label encoders for each categorical variable
for col in categorical_cols:
    label_encoders[col] = LabelEncoder()

# Define the feature names in the same order as during training
feature_names = [
    'age', 'height', 'weight', 'gross_motor', 'fine_motor', 'communication', 'problem_solving',
    'emotional_dev', 'attention', 'overactivity', 'passivity', 'planning', 'perception',
    'perception_vf', 'memory', 'spoken', 'reading', 'social_skills', 'emotional_prob'
]

@app.route('/predict', methods=['POST'])
@cross_origin()  # Allow cross-origin requests for this route

def predict():
    data = request.json  # User input in JSON format
    try:
        # Create a DataFrame from user input
        user_data = pd.DataFrame(data)

        # Convert all columns to Python integers
        user_data = user_data.applymap(int)

        # Reorganize columns to match the feature names order
        user_data = user_data[feature_names]

        # Reset the index of user_data
        user_data.reset_index(drop=True, inplace=True)

        # Reshape user_data to a two-dimensional array
        user_data = user_data.values.reshape(1, -1)

        # Make a prediction
        user_prediction = loaded_model.predict(user_data)

        # Convert NumPy int64 to Python int
        prediction = int(user_prediction[0])

        # Include the current date
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Create a dictionary with user data and prediction
        prediction_data = {
            'user_data': data,
            'prediction': prediction,
            'date': current_date
        }

        # Save the prediction to MongoDB
        collection.insert_one(prediction_data)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/predictions', methods=['GET'])
@cross_origin()  # Allow cross-origin requests for this route

def get_predictions():
    # Retrieve all predictions from the database
    predictions = list(collection.find({}, {'_id': 0}))

    return jsonify({'predictions': predictions})

    
    
    
# End of growth level prediction






# Anodya- Video record prediction


# Get the current directory of your Python script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Define the relative paths to the directories you want to create
VIDEO_DIR = os.path.join(current_directory, "Predictedvideos")
RECORDED_VIDEO_DIR = os.path.join(current_directory, "recorded_videos")
MODEL_PATH = os.path.join(current_directory, "model", "LRCN_model.h5")


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
@cross_origin()  # Allow cross-origin requests for this route

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
@cross_origin()  # Allow cross-origin requests for this route

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
@cross_origin()  # Allow cross-origin requests for this route

def get_videos():
    try:
        video_details = list(videos_collection.find({}, {'_id': 0}))
        return jsonify(video_details)
    except Exception as e:
        return jsonify({"error": str(e)})
    


@app.route('/delete_video/<int:index>', methods=['DELETE'])
@cross_origin()  # Allow cross-origin requests for this route

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
@cross_origin()  # Allow cross-origin requests for this route

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
@cross_origin()  # Allow cross-origin requests for this route

def prediction_history():
    try:
        # Query the "prediction_details" collection to get prediction history
        prediction_details_collection = videos_collection["prediction_details"]
        history_data = list(prediction_details_collection.find({}, {'_id': 0}))

        return jsonify(history_data)
    except Exception as e:
        return jsonify({"error": str(e)})




# # end of video prediction




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
  


