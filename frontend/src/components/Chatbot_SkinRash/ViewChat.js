import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Chatbot.css';
import delete_gif from './images/trash-bin.gif';
import search_gif from './images/search.gif';
import loading_gif from './images/duck_loading.gif'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ViewChat = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); // State variable for search input


  


  // Define the function to fetch chat data in the component scope
  const fetchChatData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getChats');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (Array.isArray(data.conversations)) {
        setConversations(data.conversations);
        setLoading(false);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch chat data when the component mounts
    fetchChatData();
  }, []); // The empty array ensures this effect runs once on mount


//Delete function
  const handleDeleteConversation = async (index) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this conversation?');
  
  if (isConfirmed) {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteConversation/${index}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted conversation from the state
        const updatedConversations = [...conversations];
        updatedConversations.splice(index, 1);
        setConversations(updatedConversations);

        // Display a success toast
        toast.success('Conversation deleted successfully', {
          position: 'top-center', // Set the position to 'top-center'
          autoClose: 3000, // 3 seconds
          hideProgressBar: true, // Hide the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the auto-close on hover
          draggable: true, // Allow dragging the toast
          bodyClassName: 'custom-toast-body', // Apply a custom CSS class to the toast body
        
        });
      } else {
        console.error('Failed to delete conversation');
        toast.error('Failed to delete conversation', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Error deleting conversation', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  }
};

       // Function to generate a random light color
       const getRandomLightColor = () => {
        const randomColor = () => Math.floor(Math.random() * 100 + 155); // Generate a random color between 155 and 255
        const r = randomColor();
        const g = randomColor();
        const b = randomColor();
        return `rgb(${r},${g},${b})`;
      };

    

      const filteredConversations = conversations.filter((conversation, index) => {
        if (searchText === '') {
          // Display all conversations when search text is empty
          return true;
        } else if ((index + 1).toString() === searchText) {
          // Display the conversation if it matches the search text
          return true;
        }
        return false;
      });


      
      
  return (
    <div className='ViewPage'>

     <div>

     <center>
      <h2 className='typing-header'>View Conversations</h2>
     </center>

     <Link to="/chatbot"><button type="button" class="btn btn-primary" style={{backgroundColor:'#3895d3', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
        <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</button>
      </Link>
     </div>
      
     
                      

      &nbsp;&nbsp;&nbsp;&nbsp;
      <center>
      <input
      className='search-bar'
      type="text"
      placeholder="Search Conversations By the Number"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{fontSize:'12px'}}
    />
     
    
    <img src={search_gif} alt="Search" className="circle-avatar-search" />
    </center>

      {loading ? (
        <div>
          <img src={loading_gif} alt="Loading..." className="avatar-loading" />
          </div>
        
      ) : (
        <div>
          {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation, index) => (
         
            <div
              key={index}
              className="conversation conversation-card"
              style={{ '--card-background-color': getRandomLightColor(), fontSize:'13px' }} // Set a random background color
            >
            

            <h3 style={{fontSize:'20px'}}>
              <button onClick={() => handleDeleteConversation(index)} className="delete-button">
                <img src={delete_gif} alt="Delete" className="circle-avatar" />
              </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Conversation {index + 1}
            </h3>
          
              <ul>
                {conversation.map((message, i) => (
                  <ul key={i}>
                    <strong>User:</strong> {message.text.user}
                    <br />
                    <strong>Bot:</strong> {message.text.bot}
                  </ul>
                ))}
              </ul>
            </div>
          ))
          ):(<b><p style={{fontSize:'19px'}}>The conversation was not found!</p></b>)
        }
        </div>
      )}
     
    </div>
  );
};

export default ViewChat;
