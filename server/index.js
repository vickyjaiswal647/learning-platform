// const express = require("express");
// //const bp = require("body-parser");
// const app = express();
// const port = process.env.PORT || 4000;
// const db = require("./connection/mongoose");
// const cors = require("cors");
// const shell = require("shelljs");
// var multer = require("multer");
// var upload = multer();
// app.use(express.json());

// var bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", "./views");
// app.use(express.static("assests"));
// app.use(cors());
// app.options("*", cors());

// app.use("/", require("./routes/index"));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// app.listen(port, function (err) {
//   if (err) {
//     console.log("Error in running the server");
//     return;
//   }
//   console.log(`Server  is running on port ${port}`);
// });

// // setInterval(timerFunct, 10000);

// // function timerFunct() {
// //   shell.exec("updateTest.sh");
// // }

const express = require("express");
const bp = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./connection/mongoose");
const cors = require("cors");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("assests"));
app.use(cors());
app.options("*", cors());

app.use("/", require("./routes/index"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }
  console.log(`Server is running on port ${port}`);
});
