import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../models/quiz";
import { QuestionService } from "../../services/questionsService";
import { QuizService } from "../../services/quizzesService";
const Step1 = ({ newQuiz, onChangeModel, onNextStep }) => (
  <div>
    <div>
      <div>
        <h1 className="headline">Setup new Quiz</h1>
      </div>
      <div>
        <h1>Name</h1>
        <input
          name="name"
          value={newQuiz.name}
          onChange={onChangeModel}
        ></input>
      </div>
      <div>
        <h1>Subject</h1>
        <select name="subject" onChange={onChangeModel}>
          <option key="development" value="development">
            Development
          </option>
        </select>
      </div>
    </div>
    <button
      style={{ marginTop: "30px" }}
      type="button"
      className="button"
      onClick={onNextStep}
    >
      Next
    </button>
  </div>
);

const Step2 = ({ newQuiz, onAddEvent, quesList, onSubmit, onPrevStep }) => (
  <div>
    <div>
      <h1 className="headline">Choose Questions</h1>
      <h1>Browse</h1>
    </div>
    <div>{newQuiz.name}</div>
    <div className="list">
      <table style={{ margin: "auto", backgroundColor: "beige" }}>
        <tbody>
          {quesList.map((question, key) => {
            return (
              <tr key={key}>
                <td>{question._id}</td>
                <td>{question.body}</td>
                <td>single</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => onAddEvent(question)}
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
    <button
      style={{ marginTop: "30px" }}
      type="button"
      className="button"
      onClick={onPrevStep}
    >
      Prev
    </button>
    &nbsp;
    <button type="button" className="button" onClick={onSubmit}>
      Submit
    </button>
  </div>
);

const Results = ({ newQuiz, onReset, saveQuiz }) => (
  <div>
    <div>
      <h1 className="headline">Confirm ?</h1>
    </div>
    <div>
      <div>
        <span>Title Name:</span>
        <p>{newQuiz.name}</p>
      </div>
      <div>
        <span>Subject:</span>
        <p>{newQuiz.subject}</p>
      </div>
      <div>
        {newQuiz.questions.map((question, key) => {
          return (
            <li key={key}>
              Number {key}: {question.body}
            </li>
          );
        })}
      </div>
    </div>
    <button
      style={{ margin: "30px", background: "red" }}
      type="button"
      className="button"
      onClick={onReset}
    >
      Reset
    </button>
    <button
      style={{ margin: "30px" }}
      type="button"
      className="button"
      onClick={saveQuiz}
    >
      Save
    </button>
  </div>
);
export function NewQuizPage() {
  const quesService = QuestionService();
  const quizzesService = QuizService();
  const navigate = useNavigate();
  const [quesArr, setQuesArr] = useState([]);
  const [step, setStep] = useState(1);
  const [newQuiz, setNewQuiz] = useState(Quiz);
  const [quesList, setQuesList] = useState([]);
  const onChangeModel = (e) => {
    setNewQuiz((pre) => {
      pre[e.target.name] = e.target.value;
      return { ...pre };
    });
  };
  const onAddEvent = (question) => {
    const tempArr = [...quesArr];
    const tempList = [...quesList];
    tempArr.push(question);
    setQuesArr((pre) => {
      setQuesList(tempList.filter((item) => item._id !== question._id));
      return (pre = [...tempArr]);
    });
  };
  const onNextStep = () => {
    setStep(step + 1);
  };
  const onPrevStep = () => setStep((pre) => pre - 1);
  const onSubmit = () => {
    setNewQuiz((pre) => {
      pre.questions = [...quesArr];
      pre.subject = "development";
      return pre;
    });
    setStep(null);
  };
  const onReset = () => setStep(1);
  const saveQuiz = () => {
    quizzesService.addQuiz(newQuiz).then(() => navigate("../quizzespage"));
  };

  useEffect(() => {
    quesService.getQuestion().then((resList) => {
      setQuesList((pre) => {
        pre = [...resList];
        return pre;
      });
    });
  }, []);

  if (step === 1) {
    return (
      <Step1
        newQuiz={newQuiz}
        onChangeModel={onChangeModel}
        onNextStep={onNextStep}
      />
    );
  }
  if (step === 2) {
    return (
      <Step2
        newQuiz={newQuiz}
        onAddEvent={onAddEvent}
        quesList={quesList}
        onSubmit={onSubmit}
        onPrevStep={onPrevStep}
      />
    );
  }
  if (step === null) {
    return (
      <Results newQuiz={newQuiz} onReset={onReset} saveQuiz={saveQuiz}>
        <p>Drop results here as children</p>
      </Results>
    );
  }
}
