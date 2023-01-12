import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { MainMenu } from "./components/main-menu";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/:quesId">Question</Route>
      </Routes>
    </Router>
  );
}

export default App;
