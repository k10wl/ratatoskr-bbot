import "dotenv/config";
import { Telegraf } from "telegraf";

import CONFIG from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { loadApp } from "@src/loaders";
import { debug, gracefulShutdown } from "@src/utils";

async function startServer() {
  const telegraf = new Telegraf(CONFIG.BOT_TOKEN as string);

  await loadApp(telegraf);

  const shutDown = gracefulShutdown(telegraf);
  process.on("SIGINT", shutDown);
}
void startServer()
  .then(() => debug(CONSOLE_STATEMENTS.RATATOSKR.LAUNCH.SUCCESS))
  .catch(() => debug(CONSOLE_STATEMENTS.RATATOSKR.LAUNCH.ERROR));
