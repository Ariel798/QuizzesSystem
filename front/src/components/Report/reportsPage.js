import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

export function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <button onClick={() => navigate("/reportByQuiz")}>Report by Quiz</button>
      <button onClick={() => navigate("/reportByStudent")}>
        Report by Student
      </button>

      <h1>its ReportsPage!</h1>
    </div>
  );
}
