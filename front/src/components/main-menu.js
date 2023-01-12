import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginService } from "../services/loginService";
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
        const user = await loginService.getUserById(response.id);
        localStorage.setItem("ADMIN-ID", response.id);
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
          <h1>Welcome {user.userName}!</h1>
          <div>
            <button onClick={() => logOut()}>Log Out</button>
          </div>
          <div className="main-menuDiv">
            <button className="button" onClick={() => navigate("./")}>
              Go To
            </button>
          </div>
          <div className="main-menuDiv">
            <button className="button" onClick={() => navigate("./")}>
              Go To
            </button>
          </div>
          <div className="main-menuDiv">
            <button className="button" onClick={() => navigate("./")}>
              Go To
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}
