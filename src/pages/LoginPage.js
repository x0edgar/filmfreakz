import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate(); 
  
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in. Please check your email and password.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (error) {
      setError("Failed to create an account. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); 
    } catch (error) {
      setError("Failed to log in with Google.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2> 
        {error && <p className="error">{error}</p>}

        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        {!isSignUp && (
          <button onClick={handleGoogleLogin} className="google-btn">
            <img src="/path-to-google-icon.png" alt="Google Icon" />
            Sign in with Google
          </button>
        )}

        <p>
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button className="toggle-button" onClick={() => setIsSignUp(false)}>
                Log in here
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button className="toggle-button" onClick={() => setIsSignUp(true)}>
                Sign up here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
