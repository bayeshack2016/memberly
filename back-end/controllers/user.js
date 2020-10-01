const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
const { md5Pwd } = require("../utils/cryptoUtil");
class UserCtl {
  async fetchUser(ctx) {
    ctx.body = await User.findOne();
  }
  async forgetUser(ctx) {
    ctx.verifyParams({
      password: { type: "string", required: true },
      email: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
    });
    const user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2,
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    if (user.email !== ctx.request.body.email) {
      ctx.throw(403, "邮箱错误");
    }
    const newUser = await User.findByIdAndUpdate(user._id, {
      password: md5Pwd(ctx.request.body.password),
    });
    ctx.body = newUser;
  }
  async verifyAnswer(ctx) {
    ctx.verifyParams({
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
    });
    const user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2,
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    ctx.body = user;
  }
  async createUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
    });
    let date = new Date();
    const user = await new User({
      ...ctx.request.body,
      password: md5Pwd(ctx.request.body.password),
      date: date.toLocaleDateString(),
    }).save();
    ctx.body = user;
  }
  async loginUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const user = await User.findOne({
      email: ctx.request.body.email.trim(),
      password: md5Pwd(ctx.request.body.password.trim()),
    });
    if (!user) {
      ctx.throw(403, "用户名或密码错误");
    }
    const { _id, email } = user;
    const jwt = jsonwebtoken.sign({ _id, email }, secret, {
      expiresIn: "1d",
    });
    ctx.body = jwt;
  }
  async updateUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: false },
      password: { type: "string", required: false },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true },
    });
    let user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2,
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    if (ctx.request.body.password) {
      user = await User.findByIdAndUpdate(ctx.params.id, {
        password: ctx.request.body.password,
      });
    } else {
      user = await User.findByIdAndUpdate(ctx.params.id, {
        email: md5Pwd(ctx.request.body.email),
      });
    }
    ctx.body = user;
  }
}
module.exports = new UserCtl();
