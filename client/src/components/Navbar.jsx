import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import Logout from "./Logout";
import "./navbar.css";

const Navbar = () => {
  const user = useRecoilValue(userAtom);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>IQuest</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/quest">Quest</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {!user && (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
      </ul>
      {user && (
        <div className="navbar-logout">
          <Logout />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
