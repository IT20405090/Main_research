import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Chatbot.css';
import user_avatar from './images/user.gif';
import bot_avatar from './images/chatbot.gif';


const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
 

  const [botResponses, setBotResponses] = useState([
    {
      text: 'Hi! Im the User',
      avatar: user_avatar, // Use the imported user avatar image
      user: true, // Indicate that this message is from the user
    },
    {
      text: 'Hi! Im the Bot',
      avatar: bot_avatar, // Use the imported bot avatar image
      user: false, // Indicate that this message is from the bot
    },
  ]);

  

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  function getCurrentTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

 

  const handleSendMessage = () => {
    if (userMessage) {
      // Send user message to the server (backend) for processing
      fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          const botResponse = data.response;

          // Update bot responses with the response from the server
          setBotResponses((prevBotResponses) => [
            ...prevBotResponses,
            {
              text: userMessage,
              timestamp: getCurrentTimestamp(),
              avatar: user_avatar,
              user: true,
            },
            {
              text: botResponse,
              timestamp: getCurrentTimestamp(),
              avatar: bot_avatar,
              user: false,
            },
          ]);
          setUserMessage('');

     

          // Check if the bot's response is "chatbot exited"
          if (botResponse.toLowerCase() === "exit from the chatbot") {
            // Reload the page after a short delay
            setTimeout(() => window.location.reload(), 2000); // Reload after 2 seconds (adjust the delay as needed)
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  



  return (
    <div className='Full-Chat'>
      <br/>

      <div className='chat-frame'>
      
          <div className="chatbot-container">

            <Button  size="lg" className="quarter-button" 
            style={{ borderRadius: '0', marginRight:'770px', marginTop:'7px', width:'100px' }} href="/">  <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back
            </Button>

            <Link to="/viewchat"><button type="button" class="btn btn-primary" style={{backgroundColor:'#3895d3', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
            <i class="fa-solid fa-bars"></i> &nbsp;History</button>
            </Link>

          <div className="chat-messages-container" >

          <div className="chatbot-messages">
              {botResponses.map((message, index) => (
                <div className='Bubbles' key={index}>
                  <br /><br/>
                  <div key={index} className={index % 2 === 0 ? 'user-message' : 'bot-message'}>
                    
                    <div className="message-avatar">
                      
                      <img
                        src={message.avatar}
                        
                      />
                    </div>
                    <div className="message-text">{message.text}</div>
                  </div>
                  <div className={`message-timestamp ${index % 2 === 0 ? 'user-timestamp' : 'bot-timestamp'}`}>
                    {message.timestamp}
                  </div>
                </div>
                
              ))}
              
            </div>
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message... (Type 'exit' For New Conversation)"
                value={userMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // Listen for Enter key press
                className='msg-input'
                style={{fontSize:'15px'}}
              />
              <button className='send' onClick={handleSendMessage} style={{width:'120px', fontSize:'15px'}} >
                Send &nbsp;<i class="fa-solid fa-location-arrow"></i>
              </button>
              
            </div>

          </div>
          </div>
          <br/><br/>
    </div>
  );
};

export default Chatbot;
