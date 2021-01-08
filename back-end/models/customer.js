const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const customerSchema = new Schema({
  __v: { type: "number", select: false },
  password: { type: "string", required: true, select: false },
  email: { type: "string", required: true },
  date: { type: "string", required: true },
  nickname: { type: "string", require: true },
  balance: { type: "number", require: true },
  product: { type: "array", require: true },
});
module.exports = model("User", customerSchema);
