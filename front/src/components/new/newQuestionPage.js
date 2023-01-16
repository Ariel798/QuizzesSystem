import React, { useState } from "react";
export function NewQuestionPage() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [setup,setSetup] = useState(false)
  return <div>
    {setup ? <div></div> : <div></div>}
  </div>;
}