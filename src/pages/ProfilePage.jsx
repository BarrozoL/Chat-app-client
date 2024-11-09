import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [movies, setMovies] = useState([]);
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
    } catch (err) {
      console.log("Error getting user", err);
    }
    console.log("loggedInUser", loggedInUser);
  };

  return (
    <>
      <div>Welcome {decodedToken.username}</div>
    </>
  );
}
