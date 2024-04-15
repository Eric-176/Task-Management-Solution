import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export let googleId = null;

function Login() {
  const navigate = useNavigate();

  const handleError = () => {
    console.log("failed");
  };

  const handleSuccess = (response?: any) => {
    googleId = response.clientId;
    const decoded = jwtDecode(response?.credential);
    console.log(googleId);
    navigate("/", { replace: true });
  };

  return (
    <div className="googleButton">
      <img src="../src/assets/logo.png" className="logo" alt="Plan.exe" />
      <GoogleLogin
        state_cookie_domain="single_host_origin"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default Login;
