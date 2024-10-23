import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../pages.css/HomePage.css";
import axios from "axios";

export default function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
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

  const sendMessage = async () => {
    try {
      const messageReceiver = selectedConversation?.members?.find((member) => {
        return member._id !== currentUserId;
      });

      if (!selectedConversation) {
        console.log("No conversation selected");
      }
      if (!messageReceiver) {
        console.log("Could not find message receiver.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat`,
        { text: messageText, sender: currentUserId, receiver: messageReceiver }
      );
      console.log("Message sent!", response.data);

      //Changing state right after server response and rendering new message in the client
      setSelectedConversation((prevConversation) => ({
        ...prevConversation,
        messages: [...prevConversation.messages, response.data],
      }));

      setMessageText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleLogoutUser = () => {
    logoutUser();
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    console.log("user logged out", localStorage);
    navigate("/");
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

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Welcome {loggedInUser?.username}!</h1>
      </div>
      <div>
        <button onClick={handleLogoutUser}>Logout</button>
      </div>
      <div className="private-messages-wrapper">
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
        <form onSubmit={handleSendMessage} className="message-input">
          <input
            className="message-input-bar"
            type="text"
            value={messageText}
            onChange={handleMessageTextChange}
          />
          <span>
            <button className="send-button" type="submit">
              <p>Send</p>
            </button>
          </span>
        </form>
      </div>
    </>
  );
}
