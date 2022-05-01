const DEV_CONFIG = {
  BOT_TOKEN: process.env.DEV_BOT_TOKEN,
} as const;

const PROD_CONFIG = {
  BOT_TOKEN: process.env.PROD_BOT_TOKEN,
} as const;

const CONFIG = process.env.NODE_ENV === "PROD" ? PROD_CONFIG : DEV_CONFIG;

export default CONFIG;
