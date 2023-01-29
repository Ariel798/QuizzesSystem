import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";
import { SubmitQuizModel } from "../../models/submitQuiz";

export function ReportByStudent() {
    //   const [studentQuizes, onSelectedQuiz] = props.inputs;
    // //   const data = useMemo(() => studentQuizes, []);

    const studentQuizService = StudentQuizService();
    const navigate = useNavigate();
    // const [step, setStep] = useState(1);
    const [students, setStudents] = useState([{StudentModel}]);
    const [search, setSearch] = useState('')
    //  const [submitQuiz, setSubmitQuiz] = useState([SubmitQuizModel]);
    // const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const arr = await studentQuizService.getStudents();
            setStudents(arr);
        }
        fetchData();
        // async function fetchDataSubmitQuiz(id) {
        //     const arr = await studentQuizService.getStudentQuizzes(id);
        //     setStudent(arr);
        //     console.log(arr);

        // }
        // fetchDataSubmitQuiz();
    }, [])

    const showDataStudent = (_id) => {
        navigate(`/showReportStudent/${_id}`);
    }

    return (
        <div>
            <div>
                <div className="topnav">
                    <button className="btnNav" onClick={() => navigate("../")}>Home</button>
                </div>
                <form>
                    <input type="text" placeholder="search by name..." onChange={(e) => setSearch(e.target.value)}></input>
                </form>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>function</th>
                        </tr>
                        {students.filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.fname.toLowerCase().includes(search);
                        })?.map((item, key) => {
                            // _id, number, subject, body, answers, correctAnswer, quizzes
                            return (
                                <tr key={key}>
                                    <td>{item._id} </td>
                                    <td>{item.fname} {item.lname}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={() => showDataStudent(item._id)}
                                        >select</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );


}