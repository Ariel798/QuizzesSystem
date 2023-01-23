import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { MainMenu } from "./components/main-menu";
import { QuestionsPage } from "./components/Question/questionsPage";
import {NewQuestionPage} from "./components/Question/createQuestion/newQuestionPage";
import {EditQuestionPage} from "./components/Question/editQuestionPage";
import {QuizzesPage } from "./components/Quiz/quizzesPage";
import {StudentQuiz} from "./components/Student/studentQuiz";
import {StartQuiz} from "./components/Student/startQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/quizzesPage" element={<QuizzesPage />} />
        <Route path="/questionsPage" element={<QuestionsPage />} />
        {/* <Route path="/?:id" element={}></Route> */}
        <Route path="/newQuestionPage" element={<NewQuestionPage />}>new Question</Route>
        <Route path="/editQuestionPage/:id" element={<EditQuestionPage />}>edit Question</Route>
        <Route path="/studentQuiz/:id" element={<StudentQuiz/>}>Student Quiz</Route>
        <Route path="/startQuiz" element={<StartQuiz/>}>Start Quiz</Route>
      </Routes>
    </Router>
  );
}

export default App;
