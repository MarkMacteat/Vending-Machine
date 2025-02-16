const mysql = require("mysql2");
var express = require("express");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MarkMacteat2004",
  database: "data",
  port: "3307",
});

db.connect((err) => {
  if (err) {
    console.error("Error conecting to Mysql database", err);
  } else {
    console.log("connect to Mysql database");
  }
});

module.exports = db;
