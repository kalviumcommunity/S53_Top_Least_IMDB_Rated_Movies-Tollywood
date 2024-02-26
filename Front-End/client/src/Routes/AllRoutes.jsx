import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import Login from "../Components/Login";
import Home from "../Components/Home";
import Contact from "../Components/Contact";
import FormsUse from "../Components/Form";
import Signup from "../Components/Signup";
import Update from "../UpdateForm";

function AllRoutes() {
  return <Routes>
    <Route path={"/"} element={<Home />} />
    <Route path={"/about"} element={<About />} />
    <Route path={"/login"} element={<Login />} />
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/form" element={<FormsUse />}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/update/:id" element={<Update/>}/>
  </Routes>;
}

export default AllRoutes;
