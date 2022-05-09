import "dotenv/config";
import debugLib from "debug";
import { Telegraf } from "telegraf";

import CONFIG from "@src/config";
import { loadApp } from "@src/loaders";

const debug = debugLib(CONFIG.DEBUG_NAMESPACE);

async function startServer() {
  const telegraf = new Telegraf(CONFIG.BOT_TOKEN as string);

  await loadApp(telegraf, debug);
}

void startServer()
  .then(() => debug("Ratatoskr launched without issues."))
  .catch(() => debug("An error occurred upon Ratatoskr launch."));
