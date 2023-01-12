require("dotenv").config();
const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/login',require('./routes/login-route'))

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is listening on port", process.env.PORT);
});
