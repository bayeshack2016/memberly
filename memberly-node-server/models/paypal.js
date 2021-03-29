const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const paypalSchema = new Schema({
  __v: { type: "number", select: false },
  clientId: { type: "string", required: false },
  secret: { type: "string", required: false },
  token: { type: "string", required: false },
  uid: { type: "string", required: true },
});

module.exports = model("Paypal", paypalSchema);
