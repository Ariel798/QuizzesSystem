import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../navbar";
import "./reportsPage.css";

export function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="overlay">
          <h1>
            <u>Report</u>{" "}
          </h1>
          <div className="content">
            <div className="main-menuDiv">
              <p>Report by Quiz</p>
              <button
                className="button"
                onClick={() => navigate("/reportByQuiz")}
              >
                Go To Quiz
              </button>
            </div>
            <div className="main-menuDiv">
              <p>Report by Student</p>
              <button
                className="button"
                onClick={() => navigate("/reportByStudent")}
              >
                Go To Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
