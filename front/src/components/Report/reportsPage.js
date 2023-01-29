import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ReportsPage() {

  const navigate = useNavigate();


    return (
        <div>
            <div className="topnav">
                <button className="btnNav" onClick={() => navigate("../")}>Home</button>
            </div>

            <button onClick={() => navigate("/reportByQuiz")}>Report by Quiz</button>
            <button onClick={() => navigate("/reportByStudent")}>Report by Student</button>

            <h1>its ReportsPage!</h1>
        </div>
    );
}