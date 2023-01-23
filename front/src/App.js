import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenu } from "./components/main-menu";
import { QuizzesPage } from "./components/quizzes/quizzesPage";
import { QuestionsPage } from "./components/manage-questions/questionsPage";
import { NewQuestionPage } from "./components/createQuestion/newQuestionPage";
import { NewQuizPage } from "./components/quizzes/newQuizPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/quizzespage" element={<QuizzesPage />} />
        <Route path="/questionsPage" element={<QuestionsPage />} />
        {/* <Route path="/?:id" element={}></Route> */}
        <Route path="/newquestionpage" element={<NewQuestionPage />}>
          new Question
        </Route>
        <Route path="/quizzespage/newquiz" element={<NewQuizPage />}>
          new Question
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
