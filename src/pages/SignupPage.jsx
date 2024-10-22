import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        }
      );
      console.log("User signed up successfully:", response.data);
      handleNavigateToLogin();
    } catch (err) {
      console.error("Error signing up user:", err);
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
