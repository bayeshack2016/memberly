const User = require("../models/user");
const utils = require("utility");
const { v4: uuidv4 } = require("uuid");
const jsonwebtoken = require("jsonwebtoken");
const { sendLoginMail } = require("../utils/emailUtil");
const { sendLoginMessage } = require("../utils/telegramUtil");
const { initData } = require("../utils/initUtil");

class UserCtl {
  async fetchUser(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    ctx.body = await User.findOne({ _id: ctx.request.body.uid });
  }
  async forgetUser(ctx) {
    ctx.verifyParams({
      password: { type: "string", required: true },
      email: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
      answer3: { type: "string", required: true },
    });
    const user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2,
      answer3: ctx.request.body.answer3,
      email: ctx.request.body.email,
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    const newUser = await User.findByIdAndUpdate(
      ctx.request.body.uid,
      {
        password: utils.md5(
          utils.md5(ctx.request.body.password + process.env.SECRET)
        ),
      },
      { new: true }
    );
    ctx.body = newUser;
  }

  async createUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
      answer3: { type: "string", required: true },
    });

    let date = new Date();
    const emailCheck = await User.findOne({ email: ctx.request.body.email });
    if (emailCheck) {
      ctx.throw("邮箱已注册");
    }
    const user = await new User({
      ...ctx.request.body,
      password: utils.md5(
        utils.md5(ctx.request.body.password + process.env.SECRET)
      ),
      date: date.format("yyyy-MM-dd"),
    }).save();
    initData(user._id);
    ctx.body = user;
  }
  async loginUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const user = await User.findOne({
      email: ctx.request.body.email.trim(),
      password: utils.md5(
        utils.md5(ctx.request.body.password.trim() + process.env.SECRET)
      ),
    });
    if (!user) {
      ctx.throw(403, "用户名或密码错误");
    }
    const { _id, email } = user;
    const jwt = jsonwebtoken.sign({ _id, email }, process.env.SECRET, {
      expiresIn: "1d",
    });
    sendLoginMail(
      email,
      new Date().toLocaleDateString(),
      "https://coodo.960960.xyz/#/account",
      user._id
    );
    sendLoginMessage(
      email,
      new Date().toLocaleDateString(),
      "https://coodo.960960.xyz/#/account",
      user._id
    );
    console.log({ jwt, _id });
    ctx.body = { jwt, _id };
  }
  async updateUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: false },
      password: { type: "string", required: false },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
      answer3: { type: "string", required: true },
      uid: { type: "string", required: true },
    });
    let user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2,
      answer3: ctx.request.body.answer3,
      _id: ctx.request.body.uid,
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    if (ctx.request.body.email) {
      const emailCheck = await User.findOne({ email: ctx.request.body.email });
      if (emailCheck) {
        ctx.throw(403, "该邮箱已绑定其他账户");
      }
      user = await User.findByIdAndUpdate(
        ctx.request.body.uid,
        {
          email: ctx.request.body.email,
        },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        ctx.request.body.uid,
        {
          password: utils.md5(
            utils.md5(ctx.request.body.password + process.env.SECRET)
          ),
        },
        { new: true }
      );
    }
    ctx.body = user;
  }
  async createToken(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    const token = uuidv4();
    await User.findByIdAndUpdate(ctx.request.body.uid, { coodoToken: token });
    ctx.body = token;
  }
  async updateSetting(ctx) {
    ctx.verifyParams({
      smmsKey: { type: "string", required: false },
      telegramToken: { type: "string", required: false },
      telegramId: { type: "string", required: false },
    });
    await User.findByIdAndUpdate(ctx.request.body._id, ctx.request.body);
    ctx.body = "success";
  }
}
module.exports = new UserCtl();
