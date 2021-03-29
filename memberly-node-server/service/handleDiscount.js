const Discount = require("../models/discount");

class HandleDiscount {
  async handleDiscount(discountValue, order, uid) {
    if (discountValue !== "未使用") {
      const discount = await Discount.findOne({
        code: discountValue,
        uid,
      });
      if (discount.orders) {
        discount.orders.push(order);
      } else {
        discount.orders = [order];
      }
      if (discount.activation) {
        discount.activation.push({
          timestamp: new Date().getTime(),
        });
      } else {
        discount.activation = [
          {
            timestamp: new Date().getTime(),
          },
        ];
      }
      await Discount.updateOne(
        { code: discountValue, uid },
        {
          activation: discount.activation,
          orders: discount.orders,
        }
      );
    }
  }
}
module.exports = new HandleDiscount();
