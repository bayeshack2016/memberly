const currentUrl = document.URL.split("#")[0];
module.exports = {
  devHost: "http://localhost:3001",
  prodHost: currentUrl.substring(0, currentUrl.length - 1),
};
