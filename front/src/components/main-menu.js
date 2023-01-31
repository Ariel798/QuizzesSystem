import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginService } from "../services/loginService";
import Video from "../asset/main2.mp4";
import "./main-menu.css";
import { Navbar } from "./navbar";

export function MainMenu() {
  const navigate = useNavigate();
  const loginService = LoginService();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("ADMIN-ID");
    loginService.getUserById(token).then((user) => setUser(user));
  }, []);
  const login = async () => {
    try {
      const response = await loginService.tryLogin(userName, password);
      if (response) {
        const user = await loginService.getUserById(response.token);
        localStorage.setItem("ADMIN-ID", response.token);
        setUser(user);
      }
    } catch (err) {
      alert(err);
    }
  };
  const logOut = async () => {
    localStorage.removeItem("ADMIN-ID");
    setUser(null);
  };
  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <div className="main">
            {/* <video src={Video} autoPlay loop muted /> */}
            <div className="overlay">
              <div className="content">
                <h1 className="head">Welcome {user.userName}!</h1>
                <div style={{ marginBottom: "3rem" }}>
                  <button className="submit-btn" onClick={() => logOut()}>
                    Log Out
                  </button>
                </div>
                <div className="main-menuDiv">
                  <p style={{ color: "white" }}>Quizzes</p>
                  <button
                    className="button"
                    onClick={() => navigate("./quizzesPage")}
                  >
                    Go To
                  </button>
                </div>
                <div className="main-menuDiv">
                  <p style={{ color: "white" }}>Questions</p>
                  <button
                    className="button"
                    onClick={() => navigate("./questionsPage")}
                  >
                    Go To
                  </button>
                </div>
                <div className="main-menuDiv">
                  <p style={{ color: "white" }}>Reports</p>
                  <button
                    className="button"
                    onClick={() => navigate("./reportsPage")}
                  >
                    Go To
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main">
          {/* <video src={Video} autoPlay loop muted /> */}
          <div className="overlay">
            <div className="content">
              <h1 className="head">Login</h1>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button className="submit-btn" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
