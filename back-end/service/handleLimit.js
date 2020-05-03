const Product = require("../models/product");
const Order = require("../models/order");

class handleLimit {
  async handleLimit(out_trade_no) {
    const { productName, levelName } = await Order.findOne({
      noInvoice: out_trade_no,
    });
    const product = await Product.findOne({
      productName,
    });
    const levelNameArr = product.levelName;
    let levelLimitArr = product.levelLimit;
    const levelIndex = levelNameArr.indexOf(levelName);
    let levelLimit = levelLimitArr[levelIndex];
    if (!levelLimit) {
      console.error("更改限购数量失败");
      return;
    }
    levelLimit--;
    levelLimitArr[levelIndex] = levelLimit;
    console.log(levelLimitArr);
    await Product.updateOne({ productName }, { levelLimit: levelLimitArr });
  }
}
module.exports = new handleLimit();
