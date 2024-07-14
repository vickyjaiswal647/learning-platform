const dotenv = require("dotenv");
dotenv.config();
let db;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  const mongoose = require("mongoose");

  mongoose.connect("mongodb://0.0.0.0:27017/boostMind");
  const db = mongoose.connection;

  //if not connected to db
  db.on(
    "error",
    console.error.bind(console, "Database connection not establised")
  );

  //if connection is established

  db.once("open", function () {
    console.log("Database connection establised successfully");
    return;
  });
} else {
  const mongoose = require("mongoose");

  const dbUrl = require("../config/keys").mongoURI;

  const db = async () => {
    await mongoose.connect(dbUrl,{});
    return mongoose;
  };

  db().then(async () => console.log("connected to mongodb"));
}
module.exports = db;
