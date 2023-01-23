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

  const linkClickHandler = (id) => {
    let url = `http://localhost:3000/studentQuiz/${id}`;
    navigator.clipboard.writeText(url);
    alert("link Copy!")
  };

  async function deleteData(_id) {
    if (window.confirm('Are you sure?')){
      const arr = await service.deleteQuiz(_id);
      setQuizzes(arr);
    }
  }

  async function showData(_id) {
    const question = await service.showQuiz(_id);
    alert(JSON.stringify(question));
  }

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
          <th>subject</th>
          <th>number of question</th>
          <th>function</th>
        </tr>
        {quizzes?.map((item, key) => {
          // _id, number, subject, body, answers, correctAnswer, quizzes
          //  name: String,
  // subject: String,
  // questions:
          return (
            <tr key={key}>
              <td>{item._id}</td>
              <td><button onClick={() => linkClickHandler(item._id)} >Link</button></td>
              <td>{item.name}</td>
              <td>{item.subject}</td>
              <td>{item.questions}</td>
              <td>
                <button onClick={() => showData(item._id)} className="btn btn-success">Show</button> 
                <button  className="btn btn-success">Edit</button> 
                <button onClick={() => deleteData(item._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          )
        })}
      </table>

     
    </div>
    </div>
  );
}
