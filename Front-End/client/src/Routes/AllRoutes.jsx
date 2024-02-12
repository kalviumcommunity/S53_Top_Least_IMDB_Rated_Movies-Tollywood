import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import Login from "../Components/Login";
import Home from "../Components/Home";
import Contact from "../Components/Contact";

function AllRoutes() {
  return <Routes>
    <Route path={"/"} element={<Home />} />
    <Route path={"/about"} element={<About />} />
    <Route path={"/login"} element={<Login />} />
    <Route path="/contact" element={<Contact/>}/>
  </Routes>;
}

export default AllRoutes;
