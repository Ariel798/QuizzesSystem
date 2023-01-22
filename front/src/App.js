import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { MainMenu } from "./components/main-menu";
import { QuizzesPage } from "./components/quizzesPage";
import { QuestionsPage } from "./components/menageQuestion/questionsPage";
import {NewQuestionPage} from "./components/createQuestion/newQuestionPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/quizzesPage" element={<QuizzesPage />} />
        <Route path="/questionsPage" element={<QuestionsPage />} />
        {/* <Route path="/?:id" element={}></Route> */}
        <Route path="/newQuestionPage" element={<NewQuestionPage />}>new Question</Route>
        <Route path="/showQuestionPage" element={<ShowQuestionPage />}>show Question</Route>
        <Route path="/editQuestionPage/:id" element={<EditQuestionPage />}>edit Question</Route>
      </Routes>
    </Router>
  );
}

export default App;
