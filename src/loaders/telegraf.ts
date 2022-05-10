import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { BOT_MESSAGES } from "@src/constants";
import { checkInteractionPermission } from "@src/middleware";

export async function loadTelegraf(telegraf: Telegraf, debug: Debugger) {
  try {
    telegraf.use(checkInteractionPermission());
    await telegraf.launch();
    debug(BOT_MESSAGES.TELEGRAF_LAUNCHED_SUCCESSFULLY);
  } catch (error) {
    debug(BOT_MESSAGES.TELEGRAF_LAUNCH_ERROR);
    debug(error);
  }
}
