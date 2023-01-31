import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";

export function StartQuiz() {
  let { fname } = useParams();
  const service = StudentQuizService();
  const [newStudent, setStudent] = useState(StudentModel);

  useEffect(() => {
    async function fetchData() {
      const arr = await service.getStudents();
      setStudent(arr);
      console.log(arr);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>hello {newStudent.fname}</h1>
    </div>
  );
}
