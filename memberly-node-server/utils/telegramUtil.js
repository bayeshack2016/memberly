const User = require("../models/user");
const Setting = require("../models/setting");
const TelegramBot = require("node-telegram-bot-api");
const {
  teleOrderTemplate,
  teleLoginTemplate,
  teleVerTemplate,
} = require("./template");

class TelegramUtil {
  async sendOrderMessage(
    code,
    email,
    productName,
    levelName,
    price,
    orderId,
    date,
    uid
  ) {
    const { telegramToken, telegramId } = await User.findOne({ _id: uid });

    const setting = await Setting.findOne({ uid });
    if (telegramId && telegramToken && setting.isSendOrderByTele) {
      try {
        const bot = new TelegramBot(telegramToken, { polling: true });
        bot.sendMessage(
          telegramId,
          teleOrderTemplate(
            code,
            email,
            productName,
            levelName,
            price,
            orderId,
            date
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  async sendLoginMessage(email, date, ChangePassAddress, uid) {
    const { telegramToken, telegramId } = await User.findOne({ _id: uid });
    const setting = await Setting.findOne({ uid });
    if (telegramId && telegramToken && setting.isSendLoginByTele) {
      try {
        const bot = new TelegramBot(telegramToken, { polling: true });

        bot.sendMessage(
          telegramId,
          teleLoginTemplate(email, date, ChangePassAddress)
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  async sendVerMessage(verification, uid) {
    const { telegramToken, telegramId } = await User.findOne({ _id: uid });
    const setting = await Setting.findOne({ uid });
    if (telegramId && telegramToken && setting.isSendVerByTele) {
      try {
        const bot = new TelegramBot(telegramToken, { polling: true });

        bot.sendMessage(telegramId, teleVerTemplate(verification));
      } catch (error) {
        console.log(error);
      }
    }
  }
}
module.exports = new TelegramUtil();
