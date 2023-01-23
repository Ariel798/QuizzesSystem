import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenu } from "./components/main-menu";
import { QuizzesPage } from "./components/quizzes/quizzesPage";
import {QuestionsPage} from "./components/Question/questionsPage";
import {NewQuestionPage} from "./components/Question/createQuestion/newQuestionPage";
import { NewQuizPage } from "./components/quizzes/newQuizPage";
import {StudentQuiz} from "./components/Student/studentQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/quizzespage" element={<QuizzesPage />} />
        <Route path="/questionsPage" element={<QuestionsPage />} />
        {/* <Route path="/?:id" element={}></Route> */}
        <Route path="/newquestionpage" element={<NewQuestionPage />}>
        </Route>
        <Route path="/quizzespage/newquiz" element={<NewQuizPage />}>
        </Route>
        <Route path="/studentquiz/:id" element={<StudentQuiz />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
