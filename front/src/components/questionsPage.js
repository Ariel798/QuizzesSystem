import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function QuestionsPage() {
  let navigate = useNavigate();
  useEffect(()=>{

  },[])
  return (
    <div>
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>Home</button>
      </div>
      <h1>Questions</h1>
      <div>
        <button>New Question</button>
      </div>
      <div className="list"></div>
    </div>
  );
}
