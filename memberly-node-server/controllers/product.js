const Product = require("../models/product");
class ProductCtl {
  async fetchAllProduct(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    const allProducts = await Product.find({ uid: ctx.request.body.uid });
    ctx.body = allProducts;
  }
  async fetchProduct(ctx) {
    ctx.verifyParams({
      productId: { type: "string", required: true },
    });
    const product = await Product.findOne({
      _id: ctx.request.body.productId,
    });
    if (!product || product.onSale === "no") {
      ctx.throw(404, "未找到商品信息信息");
    }
    ctx.body = product;
  }
  async createProduct(ctx) {
    ctx.verifyParams({
      productType: { type: "number", enum: [1, 2, 3], required: true },
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      allowBalance: { type: "string", enum: ["yes", "no"], required: false },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: true },
      levelNote: { type: "array", required: true },
      contact: { type: "array", required: true },
      callbackUrl: { type: "string", required: true },
      uid: { type: "string", required: true },
    });
    const product = await new Product({
      ...ctx.request.body,
      callbackUrl: ctx.request.body.callbackUrl.trim(),
    }).save();
    ctx.body = product;
  }
  async updateProduct(ctx) {
    ctx.verifyParams({
      productType: { type: "number", enum: [1, 2, 3], required: true },
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      allowBalance: { type: "string", enum: ["yes", "no"], required: true },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: false },
      levelNote: { type: "array", required: false },
      contact: { type: "array", required: true },
      callbackUrl: { type: "string", required: true },
      productId: { type: "string", required: true },
    });
    const product = await Product.findByIdAndUpdate(
      ctx.request.body.productId,
      {
        ...ctx.request.body,
        callbackUrl: ctx.request.body.callbackUrl.trim(),
      },
      { new: true }
    );
    ctx.body = product;
  }
  async deleteProduct(ctx) {
    ctx.verifyParams({
      productId: { type: "string", required: true },
    });
    const product = await Product.findByIdAndRemove(ctx.request.body.productId);
    if (!product) {
      ctx.throw(404, "删除商品失败");
    }
    ctx.status = 204;
  }
}
module.exports = new ProductCtl();
