import "./quizzesPage.css";
import React, { useEffect , useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { QuizzesService } from "../../services/quizzesService";

export function QuizzesPage() {
  const  [quizzes, setQuizzes] = useState([]);

  const service = QuizzesService();

  let navigate = useNavigate();


  useEffect(()=>{
    async function fetchData() {
      const arr = await service.getQuizzes();
      setQuizzes(arr);
      console.log(arr);
    }
    fetchData();
  },[])





  return (
    <div>


      <div>
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>Home</button>
      </div>
      <div>
      <form class="d-flex">
        <input className="form-control me-2" type="text" placeholder="Search..."></input>
        <button className="btn btn-primary" type="button">Search</button>
      </form>

      <input type='text'  placeholder='Search' />
      <h1>QuizzesPage</h1>
      <div style={{ display: "flex", display: "inline-block" }}>
        <button onClick={() => navigate("/")}>Generate New</button>
      </div>

      </div>

     
    
      <table className="table table-striped">
        <tr>
          <th>Id</th>
          <th>Link</th>
          <th>Test Name</th>
          <th>number of question</th>
          <th>Last update</th>
          <th>Type</th>
          <th>function</th>
        </tr>
        {quizzes?.map((item, key) => {
          // _id, number, subject, body, answers, correctAnswer, quizzes
          return (
            <tr key={key}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.subject}</td>
              <td>{item.questions}</td>
              <td>
                <button className="btn btn-success">show</button> 
                <button  className="btn btn-success">edit</button> 
                <button className="btn btn-danger">delete</button>
              </td>
            </tr>
          )
        })}
      </table>

     
    </div>
    </div>
  );
}
