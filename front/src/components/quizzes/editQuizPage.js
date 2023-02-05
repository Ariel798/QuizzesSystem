import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesService } from "../../services/quizzesService";
import { QuestionService } from "../../services/questionsService";

export function EditQuizPage() {
  const navigate = useNavigate();
  const { quizid } = useParams();
  const [quiz, setQuiz] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const quizService = QuizzesService();
  const questionsService = QuestionService();
  const onChangeQuiz = ({ target }) => {
    let temp = { ...quiz };
    temp[target.name] = target.value;
    setQuiz((pre) => {
      pre = { ...temp };
      return pre;
    });
  };
  const fetchQuestions = async (quiz) => {
    const questions = await questionsService.filterBySubject("development");
    const filtered = questions?.filter(
      (ques, index) => ques?._id !== quiz?.questions[index]?._id
    );
    setAvailableQuestions(filtered);
  };
  const fetchQuizData = async () => {
    const resultedQuiz = await quizService.loadQuiz(quizid);
    await fetchQuestions(resultedQuiz);
    setQuiz((pre) => {
      pre = { ...resultedQuiz };
      return pre;
    });
    setQuizQuestions((pre) => {
      pre = [...resultedQuiz?.questions];
      return pre;
    });
  };
  const appendToQuizQuestions = (question) => {
    const filteredStorage = availableQuestions.filter(
      (item) => item._id !== question._id
    );
    setAvailableQuestions((pre) => {
      pre = [...filteredStorage];
      return pre;
    });
    let temp = [...quiz.questions];
    temp.push(question);
    setQuiz((pre) => {
      pre.questions = [...temp];
      return pre;
    });
    setQuizQuestions((pre) => {
      pre = [...temp];
      return pre;
    });
  };
  const removeFromQuizQuestions = (question) => {
    const filtered = quizQuestions.filter((item) => item._id !== question._id);
    setQuiz((pre) => {
      pre.questions = [...filtered];
      return pre;
    });
    setQuizQuestions((pre) => {
      pre = [...filtered];
      return pre;
    });
    let temp = [...availableQuestions];
    temp.push(question);
    setAvailableQuestions((pre) => {
      pre = [...temp];
      return pre;
    });
  };
  const saveEditedQuiz = async () => {
    await quizService.editQuiz(quiz);
    navigate("../quizzespage");
  };
  useEffect(() => {
    fetchQuizData();
  }, []);
  return (
    <div>
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../quizzespage")}>
          Back
        </button>
      </div>
      <div>
        <h1 className="headline">Edit Quiz</h1>
      </div>
      <div>
        <p>Edit Name:</p>
        <input
          name="name"
          value={quiz.name || ""}
          onChange={onChangeQuiz}
        ></input>
      </div>
      <div className="list">
        <p>Quiz Questions:</p>
        <table style={{ margin: "auto", backgroundColor: "beige" }}>
          <tbody>
            {quizQuestions?.map((question, key) => {
              return (
                <tr key={key}>
                  <td>{question._id}</td>
                  <td>{question.body}</td>
                  <td>{key}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromQuizQuestions(question)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      &nbsp;
      <div className="list">
        <p>Questions Storage:</p>
        <table style={{ margin: "auto", backgroundColor: "beige" }}>
          <tbody>
            {availableQuestions?.map((question, key) => {
              return (
                <tr key={key}>
                  <td>{question._id}</td>
                  <td>{question.body}</td>
                  <td>{key}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => appendToQuizQuestions(question)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      &nbsp;
      <button type="button" className="button" onClick={() => saveEditedQuiz()}>
        Save
      </button>
    </div>
  );
}
