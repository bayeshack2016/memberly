const Email = require("../models/email");

class EmailCtl {
  async updateEmail(ctx) {
    ctx.verifyParams({
      mailName: { type: "string", required: true },
      mailAddress: { type: "string", required: true },
      mailPassword: { type: "string", required: true },
      sendName: { type: "string", required: true },
    });
    const email = await Email.findByIdAndUpdate(
      ctx.params.id,
      {
        ...ctx.request.body,
      },
      { new: true }
    );
    ctx.body = email;
  }
  async fetchEmail(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    ctx.body = await Email.find({ uid: ctx.request.body.uid });
  }
}
module.exports = new EmailCtl();
