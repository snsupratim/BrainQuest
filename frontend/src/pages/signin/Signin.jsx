import React, { useState } from "react";
import "./signin.css";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signin logic here (e.g., API call, validation)
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset form fields after submission if needed
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <Link to="/">
          <button type="submit">Sign In</button>
        </Link>

        <h2>Don't have an account?</h2>
        <Link to="/signup">
          <button type="submit">Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Signin;
