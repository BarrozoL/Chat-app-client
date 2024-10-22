import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken._id : null;
  const navigate = useNavigate();

  if (loggedInUser) {
    console.log("loggedInUser", loggedInUser);
  }
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

  return (
    <>
      <div>
        <h1>Welcome to your homepage {loggedInUser?.username}!</h1>
      </div>
      <div>
        <button onClick={handleLogoutUser}>Logout</button>
      </div>

      <div>
        <h1>Chats:</h1>
      </div>
    </>
  );
}
