const dotenv = require("dotenv");

dotenv.config();

const { TELEGRAM_CHANNEL } = process.env;
const { TELEGRAM_DEV_CHANNEL } = process.env;
const { TELEGRAM_ADMIN_ID } = process.env;
const { BOT_API_TOKEN } = process.env;
const { DEV_BOT_API_TOKEN } = process.env;
const { PORT } = process.env;
const { URL } = process.env;

const CONFIG = {
  TELEGRAM_CHANNEL,
  TELEGRAM_DEV_CHANNEL,
  TELEGRAM_ADMIN_ID,
  BOT_API_TOKEN,
  DEV_BOT_API_TOKEN,
  PORT,
  URL,
  checkedTagMark: " \u{1F330}",
};

module.exports = CONFIG;
