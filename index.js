const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// คำสั่งเชื่อม MongoDB Atlas
const mongo_uri = "mongodb://localhost:27017/guessingGame";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

const app = express();
const pug = require('pug');
app.set('view engine', 'pug')
app.use(cors());

// คำสั่งสำหรับแปลงค่า JSON ให้สามารถดึงและส่งค่าไปยัง MongoDB Atlas ได้
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
  console.log(`Server start at http://localhost:${port}/`)
});

app.get("/", (req, res) => {
  // res.status(200).send("หน้าแรกของ api express");
  res.redirect('/game/add')
});

// path สำหรับ MongoDB ของเรา
const Word = require("./router");
app.use("/game", Word);

app.use((req, res, next) => {
  const err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});