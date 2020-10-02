import io from "socket.io-client";
const config = require("../config");
const HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : `${config.prodHost}:8080`;
export default io(HOST);
