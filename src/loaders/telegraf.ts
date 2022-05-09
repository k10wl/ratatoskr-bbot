import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { checkInteractionPermission } from "@src/middleware";

export async function loadTelegraf(telegraf: Telegraf, debug: Debugger) {
  try {
    telegraf.use(checkInteractionPermission());
    await telegraf.launch();
  } catch (error) {
    debug("Telegraf loading error!");
    debug(error);
  }
}
