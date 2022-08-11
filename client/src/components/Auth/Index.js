import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./auth.css";
const Index = () => {
  const navigator = useNavigate();
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSignInGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        navigator("/");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
  const handleRegister = (e) => {
    setError("");
    e.preventDefault();

    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          navigator("/");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading(false);
        });
    }
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required fields is missing");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          navigator("/");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setLoading(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in using any of the following services.</p>
        <div className="sign-options">
          <div className="single-option" onClick={handleSignInGoogle}>
            <img
              src="https://mostaql.hsoubcdn.com/uploads/thumbnails/578288/60af96978807a/google.jpg"
              alt="google"
            />
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="enter your name"
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="enter your email"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="enter your password"
                  />
                </div>
                <button
                  style={{ marginTop: "10px" }}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="enter your email"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="enter your password"
                  />
                </div>
                <button
                  style={{ marginTop: "10px" }}
                  onClick={handleSignIn}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Login"}
                </button>
              </>
            )}
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setRegister(!register)}
            >
              {register ? "Login" : "Register"}..?
            </p>
          </div>
        </div>
        {error != "" && (
          <p style={{ color: "red", fontSize: "14px", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
export default Index;
