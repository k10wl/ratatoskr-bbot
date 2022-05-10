import { Debugger } from "debug";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";

import { CONSOLE_STATEMENTS } from "@src/constants";

export function gracefulShutdown(
  debug: Debugger,
  telegraf: Telegraf
): () => Promise<void> {
  return async function () {
    debug(CONSOLE_STATEMENTS.GRACEFUL_SHUTDOWN_START);

    telegraf.stop(CONSOLE_STATEMENTS.TELEGRAF_GRACEFUL_SHUTDOWN);
    debug(CONSOLE_STATEMENTS.TELEGRAF_STOPPED);

    await mongoose.disconnect();
    debug(CONSOLE_STATEMENTS.MONGOOSE_DISCONNECTED);

    process.exit(0);
  };
}
