import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNavigateToHomepage = () => {
    navigate("/homepage");
  };

  const handleNavigateBack = () => {
    navigate("/");
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem("authToken", response?.data?.authToken);

      console.log("User logged in successfully:", response.data);
      handleNavigateToHomepage();
    } catch (err) {
      console.error("Error logging in user:", err);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmitLogin}>
          <label>Email:</label>
          <input
            placeholder="Insert email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label>Password:</label>
          <input
            placeholder="Insert password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleNavigateBack}>Back</button>
      </div>
    </>
  );
}
