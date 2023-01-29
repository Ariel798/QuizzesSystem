import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";

export function ShowReportStudent() {
    const studentQuizService = StudentQuizService();
    const [student, setStudent] = useState({StudentModel});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataSubmitQuiz(id) {
            const resStudent = await studentQuizService.getStudentQuizzes(id);
            setStudent(resStudent[0]);
        }
        fetchDataSubmitQuiz(id);

    }, [])


    return (
        <div>
            {/* <h1>ok lets start!</h1> */}
            <div className="topnav">
                <button className="btnNav" onClick={() => navigate("../")}>Home</button>
                <button className="btnNav" onClick={() => console.log(student)}>test</button>
            </div>
            <div>
                quizzes of : <h1>{student.fname}</h1>
            </div>

            <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>name of test</th>
                            <th>grade</th>
                            <th>date</th>
                        </tr>
                        {student.submittedQuizzes?.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.nameOfQuiz} </td>
                                    <td>{item.grade}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    );
}