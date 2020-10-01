import io from "socket.io-client";
const config = require("../config");
const HOST =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:8080/"
    : `ws:${config.prodHost.split(":")[1]}:8080`;
export default io(HOST);
