import React from "react";
import { Link } from "react-router-dom";
import "../App.css"

export default function Navbar() {
  return (
    <div className="nav-bar">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <Link to={"/"}>
            <li><a>HOME</a></li>
          </Link>
          <Link to={"/about"}>
            <li><a>ABOUT</a></li>
          </Link>
          <Link to="/contact">
            <li><a>CONTACT</a></li>
          </Link>
          <Link to="/login">
            <li><a>LOGIN</a> </li>
          </Link>
          <Link to="/form">
            <li><a>FORM</a> </li>
          </Link>
          <Link to="/signup">
            <li><a>SIGNUP</a></li>
          </Link>
        </ul>
    </div>
  );
}

