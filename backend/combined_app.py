from flask import Flask
from app_chatbot import chatbot_app
from app_skinRash import skin_rash_app

app = Flask(__name__)

# Register the Blueprints for each application
app.register_blueprint(chatbot_app, url_prefix='/chatbot')
app.register_blueprint(skin_rash_app, url_prefix='/skin-rash')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
