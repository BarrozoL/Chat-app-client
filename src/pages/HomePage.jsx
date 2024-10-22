import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../pages.css/HomePage.css";
import axios from "axios";

export default function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken._id : null;
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/users/${currentUserId}`
      );
      setLoggedInUser(response.data);
    } catch (err) {
      console.log("Error getting user", err);
    }
  };

  const handleNavigateLogout = () => {
    navigate("/");
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    console.log("user logged out", localStorage);
  };
  const handleLogoutUser = () => {
    logoutUser();
    handleNavigateLogout();
  };

  const handleConversationClick = (e) => {
    const conversationId = e.currentTarget.dataset.id;
    findAndSetConversation(conversationId);
  };

  function findAndSetConversation(conversationId) {
    const clickedConversation = loggedInUser?.conversations?.find(
      (conversation) => conversation._id === conversationId
    );
    setSelectedConversation(clickedConversation);
  }

  if (selectedConversation) {
    console.log("selectedConversation", selectedConversation);
  }

  return (
    <div className="private-messages-wrapper">
      {/*   <div>
        <h1>Welcome {loggedInUser?.username}!</h1>
      </div>
      <div>
        <button onClick={handleLogoutUser}>Logout</button>
      </div>
 */}
      <div>
        <h1>Chats:</h1>
        <div className="conversation-sidebar">
          <h2>Conversations: </h2>
          {loggedInUser?.conversations.map((conversation) => {
            {
              const notCurrentUser = conversation?.members?.find((member) => {
                return member._id !== currentUserId;
              });
              return (
                <div
                  data-id={conversation?._id}
                  onClick={handleConversationClick}
                  key={conversation?._id}
                  className="conversation-wrapper"
                >
                  <div>Conversation with: {notCurrentUser.username}</div>
                </div>
              );
            }
          })}
        </div>
        <div className="messages-area">
          {selectedConversation?.messages.map((message) => {
            const isSentByCurrentUser = message?.sender === currentUserId;
            return (
              <div
                key={message._id}
                className={`message ${
                  isSentByCurrentUser ? "sender" : "receiver"
                }`}
              >
                <p>{message.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
