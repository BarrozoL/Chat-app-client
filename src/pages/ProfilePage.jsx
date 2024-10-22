import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { userId } = useParams();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken._id : null;

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/users/${currentUserId}`
      );
      setLoggedInUser(response.data);
      console.log("loggedInUser", loggedInUser);
    } catch (err) {
      console.log("Error getting user", err);
    }
  };

  return (
    <>
      <div></div>
    </>
  );
}
