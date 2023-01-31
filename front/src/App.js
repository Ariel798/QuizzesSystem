import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenu } from "./components/main-menu";
import { QuizzesPage } from "./components/quizzes/quizzesPage";
import { QuestionsPage } from "./components/Question/questionsPage";
import { NewQuestionPage } from "./components/Question/createQuestion/newQuestionPage";
import { NewQuizPage } from "./components/quizzes/newQuizPage";
import {StudentQuiz} from "./components/Student/studentQuiz";
import { StartQuiz } from "./components/Student/startQuiz";
import { ReportsPage } from "./components/Report/reportsPage";
import { ReportByStudent } from "./components/Report/reportByStudent";
import { ReportByQuiz } from "./components/Report/reportByQuiz";
import { ShowReportStudent } from "./components/Report/showReportStudent";
import { ShowReportQuiz } from "./components/Report/showReportQuiz";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/quizzespage" element={<QuizzesPage />} />
        <Route path="/questionsPage" element={<QuestionsPage />} />
        <Route path="/newquestionpage" element={<NewQuestionPage />}>
        </Route>
        <Route path="/quizzespage/newquiz" element={<NewQuizPage />}>
        </Route>
        <Route path="/studentquiz/:quizid" element={<StudentQuiz />}></Route>
        <Route
          path="/startquiz/:quizid/:studentid"
          element={<StartQuiz />}
        ></Route>
          <Route path="/reportsPage" element={<ReportsPage />}></Route>
        <Route path="/reportByStudent" element={<ReportByStudent />}></Route>
        <Route path="/reportByQuiz" element={<ReportByQuiz />}></Route>
        <Route
          path="/ShowReportStudent/:id"
          element={<ShowReportStudent />}
        ></Route>
        <Route path="/showReportQuiz/:id" element={<ShowReportQuiz />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
