import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { senderCanInteract } from "src/middleware";

export async function loadTelegraf(telegraf: Telegraf, debug: Debugger) {
  try {
    telegraf.use(senderCanInteract());
    await telegraf.launch();
  } catch (error) {
    debug("Telegraf loading error!");
    debug(error);
  }
}
