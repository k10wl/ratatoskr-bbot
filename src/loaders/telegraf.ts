import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { api } from "@src/api";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { auth } from "@src/middleware";

export async function loadTelegraf(telegraf: Telegraf, debug: Debugger) {
  try {
    telegraf.use(auth());

    telegraf.use(api());

    await telegraf.launch();
    debug(CONSOLE_STATEMENTS.TELEGRAF_LAUNCHED_SUCCESSFULLY);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.TELEGRAF_LAUNCH_ERROR);
    debug(error);
  }
}
