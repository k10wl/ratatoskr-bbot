const DEV_CONFIG = {
  BOT_TOKEN: process.env.DEV_BOT_TOKEN,
} as const;

const PROD_CONFIG = {
  BOT_TOKEN: process.env.PROD_BOT_TOKEN,
} as const;

const NODE_CONFIG = process.env.NODE_ENV === "PROD" ? PROD_CONFIG : DEV_CONFIG;

const SHARED_CONFIG = {
  DEBUG_NAMESPACE: "Ratatoskr:DEV",
};

const CONFIG = { ...NODE_CONFIG, ...SHARED_CONFIG };

export default CONFIG;
