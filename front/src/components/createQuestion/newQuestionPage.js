import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import {QuestionService} from "../../services/questionsService";



export function NewQuestionPage(props) {
  const [questionsArr, setQuestionsArr] = useState([]);

  const service = QuestionService();

  const [setup,setSetup] = useState(false)
  let navigate = useNavigate();

  useEffect(()=>{
    async function fetchData() {
      const arr = await service.addQuestion();
      setQuestionsArr(arr);
      console.log(arr);
    }
    fetchData();
    
  },[])

  return (
  <div>
     <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>Home</button>
      </div>
    {setup ? <div></div> : <div></div>}
    <h1>yas it is!</h1>
  </div>
  );
}