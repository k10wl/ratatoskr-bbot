import "dotenv/config";
import debugLib from "debug";
import { Telegraf } from "telegraf";

import CONFIG from "@src/config";
import { BOT_MESSAGES } from "@src/constants";
import { loadApp } from "@src/loaders";

const debug = debugLib(CONFIG.DEBUG_NAMESPACE);

async function startServer() {
  const telegraf = new Telegraf(CONFIG.BOT_TOKEN as string);

  await loadApp(telegraf, debug);
}

void startServer()
  .then(() => debug(BOT_MESSAGES.SERVER_LAUNCHED_SUCCESSFULLY))
  .catch(() => debug(BOT_MESSAGES.SERVER_LAUNCH_FAILED));
