const Product = require("../models/product");
class ProductCtl {
  async fetchAllProduct(ctx) {
    const allProducts = await Product.find({});
    ctx.body = allProducts;
  }
  async fetchProduct(ctx) {
    const product = await Product.findOne({
      productId: ctx.params.id,
    });
    if (!product || product.onSale === "no") {
      ctx.throw(404, "未找到商品信息信息");
    }
    ctx.body = product;
  }
  async createProduct(ctx) {
    ctx.verifyParams({
      productType: { type: "number", enum: [1, 2], required: true },
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: true },
      levelNote: { type: "array", required: true },
      productId: { type: "number", required: true },
      contact: { type: "array", required: true },
      callbackUrl: { type: "string", required: true },
    });
    const product = await new Product({
      productName: ctx.request.body.productName,
      productType: ctx.request.body.productType,
      productInfo: ctx.request.body.productInfo,
      memberLevel: ctx.request.body.memberLevel,
      onSale: ctx.request.body.onSale,
      levelName: ctx.request.body.levelName,
      levelPrice: ctx.request.body.levelPrice,
      levelDesc: ctx.request.body.levelDesc,
      callbackUrl: ctx.request.body.callbackUrl.trim(),
      levelLimit: ctx.request.body.levelLimit,
      levelNote: ctx.request.body.levelNote,
      productId: ctx.request.body.productId,
      contact: ctx.request.body.contact,
    }).save();
    ctx.body = product;
  }
  async updateProduct(ctx) {
    ctx.verifyParams({
      productType: { type: "number", enum: [1, 2], required: true },
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: false },
      levelNote: { type: "array", required: false },
      productId: { type: "number", required: true },
      contact: { type: "array", required: true },
      callbackUrl: { type: "string", required: true },
    });
    const product = await Product.findByIdAndUpdate(ctx.params.id, {
      ...ctx.request.body,
      callbackUrl: ctx.request.body.callbackUrl.trim(),
    });
    ctx.body = product;
  }
  async deleteProduct(ctx) {
    const product = await Product.findByIdAndRemove(ctx.params.id);
    if (!product) {
      ctx.throw(404, "删除商品失败");
    }
    ctx.status = 204;
  }
}
module.exports = new ProductCtl();
