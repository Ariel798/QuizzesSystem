require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { vertifyToken } = require("./lib/jwt");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  const { adminid } = req.headers;
  if (!adminid) {
    return next();
  }
  vertifyToken(adminid, (err, decoded) => {
    if (err) {
      return res.send("Invalid token!");
    }
    const { userid } = decoded;
    req.adminid = userid;
    next();
  });
});

app.use("/login", require("./routes/login-route"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is listening on port", process.env.PORT);
});
