import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <h1>Welcome to chat-app!</h1>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Sign up</button>
      </div>
    </>
  );
}
