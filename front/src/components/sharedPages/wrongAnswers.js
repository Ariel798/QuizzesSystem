import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubQuiz } from "../../models/subQuiz";
import { StudentModel } from "../../models/student";
import { Navbar } from "../navbar";
import { SubmittedQuizService } from "../../services/submittedQuizService";
import { StudentQuizService } from "../../services/studentQuizService";
import { QuizzesService } from "../../services/quizzesService";
export function WrongAnswers() {
  const [subQuiz, setSubQuiz] = useState(null);
  const [quiz, SetQuiz] = useState(null);
  const [student, setStudent] = useState({ StudentModel });
  const { subquizid, studentid } = useParams();
  const studentService = StudentQuizService();
  const subQuizService = SubmittedQuizService();
  const quizService = QuizzesService();
  useEffect(() => {
    getStudent();
    getQuiz();
  }, []);
  const getStudent = async () => {
    const resStudent = await studentService.getStudentById(studentid);
    setStudent(resStudent[0]);
  };
  const getQuiz = async () => {
    const resSubQuiz = await subQuizService.getSubmittedQuizById(subquizid);
    const resQuiz = await quizService.loadQuiz(resSubQuiz[0]?.quizId);
    if (resQuiz) {
      SetQuiz(resQuiz);
      setSubQuiz(resSubQuiz[0]);
    }
  };
  if (quiz) {
    return (
      <div>
        <Navbar></Navbar>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <h1>
              {student?.fname} {student?.lname}
            </h1>
            <h2>Test: {quiz.name}</h2>
          </div>
          <div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Question</th>
                  <th>Correct Answer</th>
                  <th>Student's Mistakes</th>
                </tr>
                {quiz?.questions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.body}</td>
                      {item?.correctAnswersArr.length > 0 ? (
                        <td>
                          {item?.correctAnswersArr.map((ans) => {
                            return `${item?.answers[ans]}, `;
                          })}
                        </td>
                      ) : (
                        <td>{item?.answers[item?.correctAnswer]}</td>
                      )}
                      {item?.correctAnswersArr.length > 0 ? (
                        <td style={{ color: "red" }}>
                          {subQuiz?.wrongAnswers.map((ans) => {
                            return `${item?.answers[ans]}, `;
                          })}
                        </td>
                      ) : (
                        <td style={{ color: "red" }}>
                          {item?.answers[subQuiz?.wrongAnswers[index]]}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar></Navbar>
        <h1 style={{ color: "red" }}>No Data on Test</h1>
      </div>
    );
  }
}
