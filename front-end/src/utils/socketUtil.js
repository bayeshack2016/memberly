import io from "socket.io-client";
const config = require("../config");
const HOST =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:3001/"
    : `${config.prodHost.replace("https", "wss")}`;
export default io(HOST);
