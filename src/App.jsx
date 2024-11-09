import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/personal-profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
