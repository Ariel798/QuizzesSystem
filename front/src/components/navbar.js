import React, { useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
        <span>E</span>xam <span>S</span>ystem
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>

          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact="true">
              <i className="fas fa-tachometer-alt"></i>
              <span>H</span>ome
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/quizzesPage" exact="true">
              <i className="far fa-address-book"></i>
              <span>Q</span>uizzes
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/questionsPage" exact="true">
              <i className="far fa-clone"></i>
              <span>Q</span>uestions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/reportsPage" exact="true">
              <i className="far fa-chart-bar"></i>
              <span>R</span>eports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
