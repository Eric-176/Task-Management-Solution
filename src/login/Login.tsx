import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { LOGIN_LOCAL_STORAGE } from "../App.jsx";

function Login({ setGoogleId }) {
  const navigate = useNavigate();

  const handleError = () => {
    console.log("failed");
  };

  const handleSuccess = (response?: any) => {
    const decoded = jwtDecode(response?.credential);
    //Sets googleId to user response or empty string if it doesn't exist
    if (decoded) {
      const newGoogleId = decoded.sub!;
      setGoogleId(newGoogleId);
      localStorage.setItem(LOGIN_LOCAL_STORAGE, JSON.stringify(newGoogleId));
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="googleButton">
      <div className="logo">
        <div className="logo-p">P</div>PLAN.EXE
      </div>
      <div className="login">
        <h1>Login</h1>
        <GoogleLogin
          state_cookie_domain="single_host_origin"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}

export default Login;
