import { Debugger } from "debug";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";

import { BOT_MESSAGES } from "@src/constants";

export function gracefulShutdown(
  debug: Debugger,
  telegraf: Telegraf
): () => Promise<void> {
  return async function () {
    debug(BOT_MESSAGES.GRACEFUL_SHUTDOWN_START);

    telegraf.stop(BOT_MESSAGES.TELEGRAF_GRACEFUL_SHUTDOWN);
    debug(BOT_MESSAGES.TELEGRAF_STOPPED);

    await mongoose.disconnect();
    debug(BOT_MESSAGES.MONGOOSE_DISCONNECTED);

    process.exit(0);
  };
}
