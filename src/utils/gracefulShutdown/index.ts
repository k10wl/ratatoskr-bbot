import mongoose from "mongoose";
import { Telegraf } from "telegraf";

import { CONSOLE_STATEMENTS } from "@src/constants";
import { debug } from "@src/utils";

export function gracefulShutdown(telegraf: Telegraf): () => Promise<void> {
  return async function () {
    debug(CONSOLE_STATEMENTS.GRACEFUL_SHUTDOWN_START);

    telegraf.stop(CONSOLE_STATEMENTS.TELEGRAF.GRACEFUL_SHUTDOWN);
    debug(CONSOLE_STATEMENTS.TELEGRAF.STOPPED);

    await mongoose.disconnect();
    debug(CONSOLE_STATEMENTS.MONGOOSE.DISCONNECTED);

    process.exit(0);
  };
}
