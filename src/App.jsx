import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import "./navStyles.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const LOGIN_LOCAL_STORAGE = "login.userId";

function App() {
  const navigate = useNavigate();
  const storedGoogleId = localStorage.getItem(LOGIN_LOCAL_STORAGE)
    ? JSON.parse(localStorage.getItem(LOGIN_LOCAL_STORAGE))
    : "";
  const [googleId, setGoogleId] = useState(storedGoogleId);
  useEffect(() => {
    if (!googleId) {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login setGoogleId={setGoogleId} />} />
      <Route path="/*" element={<Home googleId={googleId} />} />
    </Routes>
  );
}

export default App;
