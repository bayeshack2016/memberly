"use strict";
const path = require("path");
require("dotenv").config();

module.exports = {
  port: 3001,
  vid: "5eac198c33cb1801abf079ab",
  key: "46f4f87e5f574ea69eab813f0d0ad703",
  secret: "coodo-pay",
  connection:
    process.env.REMOTE_PROD_DB ||
    "mongodb+srv://username:password@coodo-pay.mongodb.net/test?retryWrites=true&w=majority",
  publicDir: path.resolve(__dirname, "./public"),
  logPath: path.resolve(__dirname, "./logs/koa-template.log"),
  mongoDB: {
    database: "mall",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    port: 27017,
  },
};
