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

export enum CONSOLE_STATEMENTS {
  GRACEFUL_SHUTDOWN_START = "Gracefully going offline.",

  MONGOOSE_CONNECTION_ERROR = "An error occurred while connecting ot mongoose cluster.",
  MONGOOSE_CONNECTED_SUCCESSFULLY = "Successfully connected to mongoose cluster.",
  MONGOOSE_DISCONNECTED = "Mongoose connection gracefully closed.",

  RATATOSKR_LAUNCH_ERROR = "An error occurred upon Ratatoskr launch.",
  RATATOSKR_LAUNCHED_SUCCESSFULLY = "Ratatoskr is live.",

  TELEGRAF_GRACEFUL_SHUTDOWN = "Graceful shut down.",
  TELEGRAF_LAUNCH_ERROR = "Telegraf loading error!",
  TELEGRAF_LAUNCHED_SUCCESSFULLY = "Telegraf launched without issues.",
  TELEGRAF_STOPPED = "Telegraf gracefully stopped.",
}
