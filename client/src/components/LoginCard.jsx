import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import "./loginCard.css";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      localStorage.setItem("user-quest", JSON.stringify(data));
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-card-container">
      <div className="login-card-box">
        <h1 className="login-card-heading">Welcome Back!</h1>
        <p className="login-card-subtext">Log in to explore exciting quests!</p>
        <div className="login-card-form-group">
          <label className="login-card-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-card-input"
            value={inputs.username}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className="login-card-form-group">
          <label className="login-card-label" htmlFor="password">
            Password
          </label>
          <div className="login-card-password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="login-card-input"
              value={inputs.password}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              type="button"
              className="login-card-toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>
        <button className="login-card-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="login-card-signup-link">
          Don't have an account?{" "}
          <span
            className="login-card-link-text"
            onClick={() => setAuthScreen("signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
