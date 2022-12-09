const DEV_CONFIG = {
  BOT_TOKEN: process.env.DEV_BOT_TOKEN,
  GROUP_ID: process.env.DEV_GROUP_ID,
  DB_NAME: "Ratatoskr_DB_DEV",
} as const;

const PROD_CONFIG = {
  BOT_TOKEN: process.env.PROD_BOT_TOKEN,
  GROUP_ID: process.env.PROD_GROUP_ID,
  DB_NAME: "Ratatoskr_DB",
} as const;

const NODE_CONFIG = process.env.NODE_ENV === "PROD" ? PROD_CONFIG : DEV_CONFIG;

const SHARED_CONFIG = {
  DEBUG_NAMESPACE: "Ratatoskr:DEV",
  MONGO_DATABASE_CONNECTION: process.env.MONGO_DATABASE_CONNECTION,
  LOCALE: process.env.LOCALE || "en",
  URL: process.env.URL,
  PORT: Number(process.env.PORT),
};

const CONFIG = { ...NODE_CONFIG, ...SHARED_CONFIG };

export default CONFIG;
