import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/");
  };
  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const SignupUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          username,
          email,
          password,
          imageUrl,
        }
      );
      console.log("User signed up successfully:", response.data);
      handleNavigateToLogin();
    } catch (err) {
      console.error("Error signing up user:", err);
    }
  };

  const handleUploadImageUrl = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/upload`,
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      setImageUrl(response.data.fileUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    SignupUser();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmitSignup}>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Profile Picture:</label>
          <input type="file" onChange={handleUploadImageUrl} />
          <br />
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={handleNavigateBack}>Back</button>
      </div>
    </>
  );
}
