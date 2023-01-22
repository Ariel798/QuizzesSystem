import React, { useEffect , useState} from "react";
import {QuestionService} from "../../services/questionsService";
import { useNavigate } from "react-router-dom";


export function ShowQuestionPage() {

  const  [questions, setQuestions] = useState([]);


    useEffect(()=>{
        
      },[]);

      return (
        <div>
          <h1>show is here</h1>
          <table className="table table-striped">
        <tr>
          <th>question text</th>
          <th>answer</th>
          <th>correct answer</th>
          <th>function</th>
        </tr>
        {questions?.map((item, key) => {
          // _id, number, subject, body, answers, correctAnswer, quizzes
          return (
            <tr key={key}>
              <td>{item.body}</td>
              <td>{item.answers}</td>
              <td>{item.correctAnswer}</td>
              <td>
                <button  className="btn btn-success">edit</button> 
                <button  className="btn btn-danger">delete</button>
              </td>
            </tr>
          )
        })}
      </table>
        </div>
        );


}