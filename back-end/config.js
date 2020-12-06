"use strict";
const path = require("path");
require("dotenv").config();

module.exports = {
  port: 3001,
  secret: "coodo-pay",
  smms: "ioTLRUHum8ky6YrVqTb3QY6yxITYcdT0",
  connection:
    process.env.REMOTE_PROD_DB ||
    "mongodb+srv://username:password@coodo-pay.mongodb.net/test?retryWrites=true&w=majority",
  publicDir: path.resolve(__dirname, "./public"),
  logPath: path.resolve(__dirname, "./logs/koa-template.log"),
  mongoDB: {
    database: "admin",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    port: 27017,
  },
};
