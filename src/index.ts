import "dotenv/config";
import debugLib from "debug";
import { Telegraf } from "telegraf";

import CONFIG from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { loadApp } from "@src/loaders";
import { gracefulShutdown } from "@src/utils";

const debug = debugLib(CONFIG.DEBUG_NAMESPACE);

async function startServer() {
  const telegraf = new Telegraf(CONFIG.BOT_TOKEN as string);

  await loadApp(telegraf, debug);

  const shutDown = gracefulShutdown(debug, telegraf);
  process.on("SIGINT", shutDown);
}

void startServer()
  .then(() => debug(CONSOLE_STATEMENTS.RATATOSKR_LAUNCHED_SUCCESSFULLY))
  .catch(() => debug(CONSOLE_STATEMENTS.RATATOSKR_LAUNCH_ERROR));
