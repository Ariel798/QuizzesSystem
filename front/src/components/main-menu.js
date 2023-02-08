import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginService } from "../services/loginService";
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
          <div style={{ marginBottom: "3rem" }}>
            <button
              className="submit-btn"
              style={{ backgroundColor: "red", marginTop: 3 }}
              onClick={() => logOut()}
            >
              Log Out
            </button>
          </div>
          <h1 className="head">
            Welcome <strong>{user.userName}</strong> to the exam system!
          </h1>
          <div
            className="thought"
            style={{
              backgroundColor: "darkGray",
              color: "black",
              margin: "auto",
              width: "600px",
              height: "auto",
              borderRadius: "6px",
              padding: "3px",
              fontStyle: "italic",
              fontFamily: "sans-serif",
            }}
          >
            <h3>Go to "Questions" and create a question</h3>
            <br></br>
            <h3>Go to "Quizzes" and create a test</h3>
            <br></br>
            <h3>
              When the test is ready, copy the link and send it to whoever needs
              it
            </h3>
            <br></br>
            <h3>
              You can collect data on the submitted quizzes on the "Reports"
              page
            </h3>
          </div>
        </div>
      ) : (
        <div className="main">
          <div className="overlay">
            <div className="content">
              <h1 className="head">Login</h1>
              <form>
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
                <Link to="#" style={{ alignSelf: "flex-start" }}>
                  <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
                </Link>
                <button className="submit-btn" onClick={login}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
