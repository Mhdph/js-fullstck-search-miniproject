const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "karanzaroot",
  database: "testDB",
});

db.connect((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("sql connected");
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb is connected"))
  .catch(() => console.log("could not connect to mongodb"));

app.use("/", userRouter);
app.post("/api/insert", (req, res) => {
  const family = req.body.family;
  const age = req.body.age;
  const name = req.body.name;
  const work = req.body.work;
  const date = req.body.date;

  const sqlInsert =
    "INSERT INTO employer (family,age,name,work,date) VALUES (?,?,?,?,?);";

  db.query(sqlInsert, [family, age, name, work, date], (err, result) => {
    res.send("hello world");
  });
});
app.listen(process.env.PORT || 8080, () => {
  console.log("Backend Is Runing");
});
