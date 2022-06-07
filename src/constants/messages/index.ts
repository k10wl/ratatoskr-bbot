export const BOT_MESSAGES = {
  CANT_INTERACT_MESSAGE: "CANT_INTERACT_MESSAGE",
  ERROR: "ERROR",
  INFO: "INFO",
  POST_CANCELED: "POST_CANCELED",
  POST_FORWARDED: "POST_FORWARDED",
  POST_TAGS_SELECTED_SYMBOL: "🌰",
  TAGS_UPDATED: "TAGS_UPDATED",
  TAGS_UPDATING_TAGS: "TAGS_UPDATING_TAGS",
  TAGS_WRONG_MESSAGE: "TAGS_WRONG_MESSAGE",
  TEXT_REACTION_COUNTDOWN_SECONDS: 10,
  TEXT_REACTION_COUNTDOWN_STEP_SECONDS: 1,
  TEXT_REACTION_PREFIX: "TEXT_REACTION_PREFIX",
  TEXT_REACTION_SUFFIX: "TEXT_REACTION_SUFFIX",
} as const;

export const CONSOLE_STATEMENTS = {
  GRACEFUL_SHUTDOWN_START: "Gracefully going offline.",

  MONGOOSE: {
    CONNECTION: {
      ERROR: "An error occurred while connecting ot mongoose cluster.",
      SUCCESS: "Successfully connected to mongoose cluster.",
    },
    DISCONNECTED: "Mongoose connection gracefully closed.",
    NO_DATA_FOUND: "No data found by your query.",
  },

  RATATOSKR: {
    LAUNCH: {
      ERROR: "An error occurred upon Ratatoskr launch.",
      SUCCESS: "Ratatoskr is live.",
    },
  },

  TELEGRAF: {
    GRACEFUL_SHUTDOWN: "Graceful shut down.",
    LAUNCH: {
      ERROR: "Telegraf loading error!",
      SUCCESS: "Telegraf launched without issues.",
    },
    STOPPED: "Telegraf gracefully stopped.",
  },

  STRING_PARSE_ERROR: "Cannot parse tags. Wrong string format.",
} as const;
