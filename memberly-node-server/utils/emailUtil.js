const nodemailer = require("nodemailer");
const Email = require("../models/email");
const Setting = require("../models/setting");
const {
  emailOrderTemplate,
  emailVerTemplate,
  emailLoginTemplate,
} = require("./template");
const fetchMailTransport = (emails, setting) => {
  let trasport = {};
  const { mailAddress, mailPassword } = emails;
  switch (setting.defaultMail) {
    case "gmail":
      trasport = {
        service: setting.defaultMail,
        auth: {
          user: mailAddress,
          pass: mailPassword,
          type: "OAuth2",
          clientId: emails.clientId,
          clientSecret: emails.clientSecret,
          refreshToken: emails.refreshToken,
        },
      };
      break;

    case "smtp":
      trasport = {
        host: emails.host,
        port: 465,
        secure: true,
        auth: {
          user: mailAddress, // generated ethereal user
          pass: mailPassword, // generated ethereal password
        },
      };
      break;

    default:
      trasport = {
        service: setting.defaultMail,
        auth: {
          user: mailAddress,
          pass: mailPassword,
        },
      };
      break;
  }
  return trasport;
};
class emailUtil {
  async sendVeriMail(email, verification, uid) {
    const setting = await Setting.findOne({ uid });
    if (!setting.isSendVerByMail) {
      return;
    }
    const emailArr = await Email.find({ uid: ctx.request.body.uid });
    const emails = emailArr.filter(
      (item) => item.mailName === setting.defaultMail
    )[0];
    let transporter = nodemailer.createTransport(
      fetchMailTransport(emails, setting)
    );
    const { mailAddress, sendName } = emails;
    let mailOptions = {
      from: `${sendName} <${mailAddress}>`,
      to: `${email}`,
      subject: "找回密码",
      html: emailVerTemplate(verification),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
      }
    });
  }
  async sendOrderMail(
    code,
    email,
    productName,
    levelName,
    price,
    orderId,
    date,
    uid
  ) {
    const setting = await Setting.findOne({ uid });
    if (!setting.isSendOrderByMail) {
      return;
    }
    const emailArr = await Email.find({ uid: ctx.request.body.uid });
    const emails = emailArr.filter(
      (item) => item.mailName === setting.defaultMail
    )[0];
    let transporter = nodemailer.createTransport(
      fetchMailTransport(emails, setting)
    );
    const { mailAddress, sendName } = emails;
    let mailOptions = {
      from: `${sendName} <${mailAddress}>`,
      to: `${email}`,
      subject: `${productName}${levelName}`,
      html: emailOrderTemplate(
        code,
        email,
        productName,
        levelName,
        price,
        orderId,
        date
      ),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
      }
    });
  }
  async sendLoginMail(email, date, ChangePassAddress, uid) {
    const setting = await Setting.findOne({ uid });
    if (!setting.isSendLoginByMail) {
      return;
    }
    const emailArr = await Email.find({ uid: ctx.request.body.uid });
    const emails = emailArr.filter(
      (item) => item.mailName === setting.defaultMail
    )[0];
    const { mailAddress, sendName } = emails;

    let transporter = nodemailer.createTransport(
      fetchMailTransport(emails, setting)
    );
    let mailOptions = {
      from: `${sendName} <${mailAddress}>`,
      to: `${email}`,
      subject: "登录提醒",
      html: emailLoginTemplate(email, date, ChangePassAddress),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
      }
    });
  }
}
module.exports = new emailUtil();
