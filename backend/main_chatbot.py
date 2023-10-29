import re
import long_responses as long


def message_probability(user_message, recognised_words, single_response=False, required_words=[]):
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
    highest_prob_list = {}

    # Simplifies response creation / adds it to the dict
    def response(bot_response, list_of_words, single_response=False, required_words=[]):
        nonlocal highest_prob_list
        highest_prob_list[bot_response] = message_probability(message, list_of_words, single_response, required_words)

    

    # Responses -------------------------------------------------------------------------------------------------------
    response('Hello! How can I help/assist you today 😊 ?', ['hello', 'hi', 'hey', 'sup', 'heyo','Hy'], single_response=True)
    response('See you!', ['bye', 'goodbye'], single_response=True)
    response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'], required_words=['how'])
    response('You\'re welcome!', ['thank', 'thanks'], single_response=True)
    response('Thank you!', ['i', 'love', 'code', 'palace'], required_words=['code', 'palace'])

    # Longer responses

    #common problems asked from parents

        
    #Food/Eating
    response(long.R_EATING, ['what', 'my','baby','eat','feed','meal','meals'])

    #feeding time
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
    
    response(long.R_EATING, ['what', 'my','baby','eat','feed','meal','meals','food'], required_words=['what'])
    response(long.R_ADVICE_FEEDING, ['feeding', 'baby','place','how','feed'], required_words=['how', 'feed'])
    response(long.R_DIET, ['when', 'introduce', 'give', 'solid', 'foods'], required_words=['when', 'solid','foods'])
    response(long.R_TUMMY_TIME, ['why', 'tummy', 'time', 'important'], required_words=['why', 'tummy', 'time', 'important'])
    response(long.R_ALLERGIES, ['how', 'introduce', 'solid', 'foods'], required_words=['how', 'introduce', 'solid', 'foods'])
    response(long.R_FOOD_INTRODUCTION, ['when', 'start', 'feeding', 'solids'], required_words=['when', 'start', 'feeding', 'solids'])
    response(long.R_BOTTLE_WEANING, ['when', 'transition', 'bottle', 'sippy', 'cup'], required_words=['when', 'transition', 'bottle', 'sippy', 'cup'])
    response(long.R_ADVICE_TUMMY_TIME, ['how', 'make', 'tummy', 'time'], required_words=['how', 'make', 'tummy', 'time'])



#sleep
    response(long.R_SLEEP, ['how', 'much', 'sleep'], required_words=['how', 'much', 'sleep'])
    response(long.R_ADVICE_SLEEP, ['sleep', 'routine'], required_words=['sleep', 'routine'])

#sickness
    #fever
    response(long.R_FEVER, ['what', 'do', 'fever'], required_words=['fever'])        
    response(long.R_FEVERS, ['what', 'do', 'fever'], required_words=['what', 'do', 'fever'])

    #skin rashes
    response(long.R_RINGWORM, ['what', 'ringworm'], required_words=['what', 'ringworm'])
    response(long.R_MILIA, ['what', 'milia'], required_words=['what', 'milia'])
    response(long.R_PETECHIAE, ['what', 'petechiae'], required_words=['what', 'petechiae'])
    response(long.R_MONGOLIAN_SPOTS, ['what', 'mongolian', 'spots'], required_words=['what', 'mongolian', 'spots'])
    response(long.R_HIVES, ['what', 'hives'], required_words=['what', 'hives'])
    response(long.R_ECZEMA, ['what', 'do', 'baby', 'eczema'], required_words=['what', 'do', 'baby', 'eczema'])


    response(long.R_IMPETIGO, ['what', 'is', 'impetigo'], required_words=['what', 'is', 'impetigo'])
    response(long.R_PUSTULES, ['what', 'are', 'pustules'], required_words=['what', 'are', 'pustules'])
    response(long.R_STRABERRY_HEMANGIOMA, ['what', 'is', 'strawberry', 'hemangioma'], required_words=['what', 'is', 'strawberry', 'hemangioma'])
    response(long.R_DRY_SKIN, ['how', 'treat', 'dry', 'skin'], required_words=['how', 'treat', 'dry', 'skin'])
    response(long.R_SCABIES, ['what', 'is', 'scabies'], required_words=['what', 'is', 'scabies'])
    response(long.R_RINGWORM, ['what', 'is', 'ringworm'], required_words=['what', 'is', 'ringworm'])
    
    #skin problem based on parents view
    response(long.R_RED_RASH_ON_BODY, ['red', 'rash', 'body'], required_words=['red', 'rash'])
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
    
    response(long.R_SKIN_SENSITIVITY, ['how', 'care', 'sensitive', 'skin'], required_words=['how', 'care', 'sensitive', 'skin'])
    response(long.R_BATHING_SKIN, ['how', 'bathe', 'baby', 'skin'], required_words=['how', 'bathe', 'baby', 'skin'])
    response(long.R_SUN_PROTECTION, ['how', 'protect', 'baby', 'sun'], required_words=['how', 'protect', 'baby', 'sun'])
    response(long.R_DIAPER_RASH_PREVENTION, ['how', 'prevent', 'diaper', 'rash'], required_words=['how', 'prevent', 'diaper', 'rash'])
    response(long.R_CLOTHING_MATERIAL, ['what', 'choose', 'baby', 'clothing'], required_words=['what', 'choose', 'baby', 'clothing'])
    response(long.R_MASSAGE, ['how', 'massage', 'baby'], required_words=['how', 'massage', 'baby'])
    response(long.R_RASH_IDENTIFICATION, ['how', 'identify', 'baby', 'rashes'], required_words=['how', 'identify', 'baby', 'rashes'])
    



  
    response(long.R_DIAPER, ['how', 'often', 'change', 'diaper'], required_words=['change', 'diaper'])
    response(long.R_FUSSY, ['why', 'baby', 'fussy'], required_words=['why', 'baby', 'fussy'])
    response(long.R_TEETHING, ['when', 'start', 'teething'], required_words=['when', 'start', 'teething'])
    
    response(long.R_VACCINATIONS, ['why', 'vaccinations', 'important'], required_words=['why', 'vaccinations', 'important'])
    response(long.R_BATHING, ['how', 'bathe', 'baby'], required_words=['how', 'bathe'])
    
    response(long.R_CRAWLING, ['when', 'start', 'crawling'], required_words=['when', 'start', 'crawling'])
    response(long.R_PLAY, ['why', 'playtime', 'important'], required_words=['why', 'playtime', 'important'])
    response(long.R_SKIN_CARE, ['how', 'care', 'baby', 'skin'], required_words=['how', 'care', 'baby', 'skin'])
    response(long.R_RESPONSIVE, ['how', 'comfort', 'baby', 'crying'], required_words=['how', 'comfort', 'baby', 'crying'])
    response(long.R_CRYING, ['why', 'baby', 'cry'], required_words=['why', 'baby', 'cry'])
    
    response(long.R_DEVELOPMENT, ['how', 'baby', 'develop', 'milestones'], required_words=['how', 'baby', 'develop', 'milestones'])
    response(long.R_SPIT_UP, ['why', 'baby', 'spit', 'up'], required_words=['why', 'baby', 'spit', 'up'])
    response(long.R_ALLERGIES, ['how', 'introduce', 'solid', 'foods'], required_words=['how', 'introduce', 'solid', 'foods'])
    response(long.R_SAFETY, ['how', 'baby-proof', 'home'], required_words=['how', 'baby-proof', 'home'])
    
    response(long.R_DIAPER_RASH, ['how', 'treat', 'diaper', 'rash'], required_words=['how', 'treat', 'diaper', 'rash'])
    response(long.R_BONDING, ['how', 'bond', 'baby'], required_words=['how', 'bond', 'baby'])
    response(long.R_FOOD_INTRODUCTION, ['when', 'start', 'feeding', 'solids'], required_words=['when', 'start', 'feeding', 'solids'])
    response(long.R_BOTTLE_WEANING, ['when', 'transition', 'bottle', 'sippy', 'cup'], required_words=['when', 'transition', 'bottle', 'sippy', 'cup'])
    response(long.R_SCREEN_TIME, ['how', 'limit', 'screen', 'time'], required_words=['how', 'limit', 'screen', 'time'])
    
    response(long.R_LANGUAGE_DEV, ['how', 'promote', 'language', 'development'], required_words=['how', 'promote', 'language', 'development'])
    response(long.R_IMMUNIZATION, ['why', 'important', 'immunization'], required_words=['why', 'important', 'immunization'])
    response(long.R_CRADLE_CAP, ['what', 'cradle', 'cap'], required_words=['what', 'cradle', 'cap'])
    response(long.R_SICKNESS_SIGN, ['signs', 'baby', 'sickness'], required_words=['signs', 'baby', 'sickness'])
    response(long.R_OUTDOOR_TIME, ['benefits', 'outdoor', 'time'], required_words=['benefits', 'outdoor', 'time'])

    

    

    #advice for parents
    response(long.R_ADVICE_DIAPERING, ['diaper', 'change'], required_words=['diaper', 'change'])
    response(long.R_ADVICE_BONDING, ['bonding', 'baby'], required_words=['bonding', 'baby'])
    response(long.R_ADVICE_SELF_CARE, ['self', 'care'], required_words=['self', 'care'])
    response(long.R_ADVICE_SUPPORT_NETWORK, ['support', 'network'], required_words=['support', 'network'])
    response(long.R_ADVICE_MENTAL_HEALTH, ['mental', 'health'], required_words=['mental', 'health'])
   
    response(long.R_ADVICE_CELEBRATE_MILESTONES, ['celebrate', 'milestones'], required_words=['celebrate', 'milestones'])
    response(long.R_ADVICE_TUMMY_TIME, ['how', 'make', 'tummy', 'time'], required_words=['how', 'make', 'tummy', 'time'])
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
    # print(highest_prob_list)
    # print(f'Best match = {best_match} | Score: {highest_prob_list[best_match]}')

    return long.unknown() if highest_prob_list[best_match] < 1 else best_match


# # Used to get the response
# def get_response(user_input):
#     split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
#     response = check_all_messages(split_message)
#     return response

# Used to get the response
def get_response(user_input):
    # Convert user input to lowercase
    user_input = user_input.lower()
    
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input)
    response = check_all_messages(split_message)
    return response

# # Testing the response system
# while True:
#     print('Bot: ' + get_response(input('You: ')))

# Testing the response system
while True:
    user_input = input('You: ')
    if user_input.lower() == 'exit':
        break  # Exit the loop if the user inputs "exit"
    print('Bot:', get_response(user_input))