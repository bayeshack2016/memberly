const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const settingSchema = new Schema({
  __v: { type: "number", select: false },
  themeOption: {
    type: "string",
    enum: [
      "default",
      "tech",
      "nostalgic",
      "blur",
      "black_yellow",
      "blue_white",
      "blue_gray",
      "purple_yellow",
      "black_blue",
      "dark_blue",
    ],
    required: true,
  },
  defaultMail: {
    type: "string",
    enum: ["qq", "163", "gmail", "smtp"],
    required: true,
  },
  isSendOrderByEmail: { type: "boolean", required: true },
  isSendLoginByEmail: { type: "boolean", required: true },
  isSendVerByEmail: { type: "boolean", required: true },
  isSendOrderByTele: { type: "boolean", required: true },
  isSendLoginByTele: { type: "boolean", required: true },
  isSendVerByTele: { type: "boolean", required: true },
  uid: { type: "string", required: true },
});

module.exports = model("Setting", settingSchema);
