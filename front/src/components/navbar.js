import React, { useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

export function Navbar() {
  return (
    <div className="topnav" id="myTopnav">
      <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
        <span>E</span>xam <span>S</span>ystem
      </NavLink>
      <NavLink className="nav-link" to="/" exact="true">
        <span>H</span>ome
      </NavLink>

      <NavLink className="nav-link" to="/quizzesPage" exact="true">
        <span>Q</span>uizzes
      </NavLink>

      <NavLink className="nav-link" to="/questionsPage" exact="true">
        <span>Q</span>uestions
      </NavLink>
      <NavLink className="nav-link" to="/reportsPage" exact="true">
        <span>R</span>eports
      </NavLink>
      <a href="javascript:void(0);" class="icon" onClick={() => myFunction()}>
        <i class="fa fa-bars"></i>
      </a>
    </div>
  );
}
