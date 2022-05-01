import debugLib from "debug";
import "dotenv/config";
import { Telegraf } from "telegraf";

import CONFIG from "./config";
import { loadTelegraf } from "./loaders/telegraf";

const debug = debugLib("Ratatoskr:dev");

async function startServer() {
  const telegraf = new Telegraf(CONFIG.BOT_TOKEN as string);

  await loadTelegraf(telegraf, debug);
}

void startServer()
  .then(() => debug("Ratatoskr launched without issues."))
  .catch(() => debug("An error occurred upon Ratatoskr launch."));
