const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const customerSchema = new Schema({
  __v: { type: "number", select: false },
  password: { type: "string", required: true, select: false },
  email: { type: "string", required: true },
  verification: { type: "string", required: false },
  product: { type: "array", required: false },
  date: { type: "string", required: true },
  year: { type: "number", required: true },
  month: { type: "number", require: true },
  day: { type: "number", required: true },
  balance: { type: "number", require: false },
  order: { type: "array", require: false },
});
module.exports = model("Customer", customerSchema);
