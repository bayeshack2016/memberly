const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const alipaySchema = new Schema({
  __v: { type: "number", select: false },
  uid: { type: "string", required: true },
  appId: { type: "string", required: false },
  publicKey: { type: "string", required: false },
  secretKey: { type: "string", required: false },
  notifyUrl: { type: "string", required: false },
});

module.exports = model("Alipay", alipaySchema);
