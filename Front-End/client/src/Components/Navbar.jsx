import React from "react";
import { Link , useNavigate } from "react-router-dom";
import "../App.css"
import Login from "./Login";
import { AppContext } from "../ParentContext";
import { useContext } from "react";

export default function Navbar() {

  const {login,setlogin} = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (login) {
      localStorage.setItem("isLoggedin", "false");
      setlogin(false);
      navigate("/login");
      alert("Your Logging Out")
    } 
  };
  console.log(login);
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
            <button onClick={()=>{
              handleLogin();if(!login){
                navigate("login")
              }
            }}>
              <li><a>{login ? "LOGOUT" : "LOGIN"}</a> </li>
            </button>
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

