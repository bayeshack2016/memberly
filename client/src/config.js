const currentUrl = document.URL.split("#")[0];
module.exports = {
  devHost: "http://localhost:3001",
  prodHost:
    currentUrl.indexOf("pay") > -1
      ? "https://pay.960960.xyz"
      : "https://coodopay.herokuapp.com",
};
