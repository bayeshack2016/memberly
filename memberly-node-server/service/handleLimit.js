const Product = require("../models/product");
const Order = require("../models/order");

class handleLimit {
  async handleLimit(orderId, uid) {
    const order = await Order.findOne({
      orderId,
      uid,
    });
    const { productName, levelName } = order;
    const product = await Product.findOne({
      productName,
      uid,
    });
    const levelNameArr = product.levelName;
    let levelLimitArr = product.levelLimit;
    const levelIndex = levelNameArr.indexOf(levelName);
    let levelLimit = levelLimitArr[levelIndex];

    if (!levelLimit) {
      console.error("无限购");
      return;
    }
    levelLimit--;
    levelLimitArr[levelIndex] = levelLimit;
    await Product.updateOne(
      { productName, uid },
      { levelLimit: levelLimitArr }
    );
  }
}
module.exports = new handleLimit();
