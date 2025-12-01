import React, { useState } from "react";
import "./App.css";
import googlelogo from "./assets/google.png";
import { useNavigate } from "react-router-dom";
import { login, signup } from "./services/authService";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN FLOW
        const data = await login({ username, password });
        localStorage.setItem("cineverse_token", data.token);
        navigate("/");
      } else {
        // SIGNUP FLOW - MATCH BACKEND JSON
        const payload = {
          username: username,
          password: password,
          role: "USER",
          phone: phone,
          city: city,
          state: state,
        };

        await signup(payload);
        setIsLogin(true); // Switch to Login tab
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* TAB BUTTONS */}
        <div className="tabs">
          <button
            className={`loginbtn switch-btn ${isLogin ? "active-tab" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`loginbtn switch-btn ${!isLogin ? "active-tab" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <p className="small-text">
          {isLogin
            ? "Enter your details to login"
            : "Create your CineVerse account"}
        </p>

        <h2 className="title-text">
          {isLogin ? "Welcome Back" : "Join CineVerse"}
        </h2>

        {/* ERROR MESSAGE */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* USERNAME FIELD (REQUIRED FOR BOTH LOGIN & SIGNUP) */}
          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* SIGNUP EXTRA FIELDS */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Phone Number"
                className="input-box"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="City"
                className="input-box"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="State"
                className="input-box"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </>
          )}

          {/* LOGIN OPTIONS */}
          {isLogin && (
            <div className="options-row">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <button className="link-btn" type="button">
                Forgot password?
              </button>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            className="loginbtn main-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <button className="loginbtn google-btn" type="button">
            <img
              src={googlelogo}
              alt="Google Logo"
              className="google-icon"
            />
            Sign in with Google
          </button>
        )}

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="switch-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
