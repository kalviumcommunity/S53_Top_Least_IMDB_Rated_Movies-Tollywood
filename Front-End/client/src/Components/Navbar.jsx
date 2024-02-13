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
        </ul>
                  {/* <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Enter movie name</span>
              <span className="label-text-alt">Hero name</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <div className="label">
              <span className="label-text-alt">Director name</span>
              <span className="label-text-alt"></span>
            </div>
          </label> */}
    </div>
  );
}

