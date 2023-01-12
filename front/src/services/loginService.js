export function LoginService() {
  const tryLogin = async (userName, password) => {
    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
      }),
    }).then((res) => res.json());
  };

  const getUserById = async (token) => {
    return fetch("http://localhost:3001/login", { headers: { adminId: token } })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  return {
    tryLogin,
    getUserById,
  };
}
