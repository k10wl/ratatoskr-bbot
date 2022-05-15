export const BOT_MESSAGES = {
  CANT_INTERACT_MESSAGE: `❗️❗️❗️RESTRICTED ACCESS❗️❗️❗️\n\nYou can't interact with Ratatoskr.\nIf you believe that this is a mistake - message developers.\n\nLeave in peace.  🐿️`,

  TEXT_REACTION: {
    PREFIX:
      "Please send photo 📷 or video 📹 to create post.\nUse menu commands to manage bot. 🔧\n\n(This message will disappear in",
    COUNTDOWN_SECONDS: 10,
    SUFFIX: "seconds. 🥷)",
    COUNTDOWN_STEP_SECONDS: 1,
  },
} as const;

export const CONSOLE_STATEMENTS = {
  GRACEFUL_SHUTDOWN_START: "Gracefully going offline.",

  MONGOOSE: {
    CONNECTION: {
      ERROR: "An error occurred while connecting ot mongoose cluster.",
      SUCCESS: "Successfully connected to mongoose cluster.",
    },
    DISCONNECTED: "Mongoose connection gracefully closed.",
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
} as const;
