import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";


export function StartQuiz() {
    let { fname } = useParams();
    const service = StudentQuizService();
    const [newStudent, setStudent] = useState(StudentModel)


    useEffect(() => {
        async function fetchData() {
            const arr = await service.getStudents();
            setStudent(arr);
            console.log(arr);
        }
        fetchData();
    }, [])

    // const back = () =>{
    //     window.location.href = history.back
    // } 

    return (
        <div>
            <h1>hello {newStudent.fname}</h1>
            {/* <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                    </tr>
                    {newStudent?.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item._id}</td>
                                <td>{item.fname}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </div>
    );

}