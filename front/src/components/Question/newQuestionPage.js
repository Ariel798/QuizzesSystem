import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import {QuestionService} from "../../services/questionsService";



export function NewQuestionPage() {
  const [questionsArr, setQuestionsArr] = useState([]);

  const service = QuestionService();

  const [setup,setSetup] = useState(false)
  let navigate = useNavigate();
  
  async function fetchData() {
    const arr = await service.addQuestion();
    setQuestionsArr(arr);
    console.log(arr);
  }
  fetchData();
  
  useEffect(()=>{
  },[])

  return (
  <div>
     <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>Home</button>
      </div>
   <h1>add new question</h1>
   <div><span> the question?: </span><input type="text"></input></div>
   <div><span> Answer: </span><input type="text"></input><input type="radio" ></input></div>
   <div><span> Answer: </span><input type="text"></input><input type="radio" ></input></div>
   <div><span> Answer: </span><input type="text"></input><input type="radio" ></input></div>
   <div><span> Answer: </span><input type="text"></input><input type="radio" ></input></div>
   <button type="submit" onClick={fetchData()}>submit</button>
  </div>
  );
}