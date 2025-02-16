var mysql = require("mysql2");
var express = require("express");
const app = express();

const db = mysql.createConnection({
  server: "localhost",
  database: "data",
  user: "root",
  password: "MarkMacteat2004",
  port: "3307",
});

app.get("/products", async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
      return res.json(data);
    });
  } catch {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("listening...");
});

// config.connect((err) => {
//   if (err) {
//     console.error("Error conecting to Mysql database", err);
//   } else {
//     console.log("connect to Mysql database");
//   }
// });
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("connected");
//   con.query("SELECT * FROM products", function (err, result) {
//     if (err) throw err;
//     //console.log("Result: " + JSON.stringify(result));
//   });
// });
