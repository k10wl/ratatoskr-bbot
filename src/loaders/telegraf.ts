import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { api } from "@src/api";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { auth, debug } from "@src/middleware";

export async function loadTelegraf(telegraf: Telegraf, debugFn: Debugger) {
  try {
    telegraf.use(debug(debugFn));

    telegraf.use(auth());

    telegraf.use(api());

    await telegraf.launch();
    debugFn(CONSOLE_STATEMENTS.TELEGRAF_LAUNCHED_SUCCESSFULLY);
  } catch (error) {
    debugFn(CONSOLE_STATEMENTS.TELEGRAF_LAUNCH_ERROR);
    debugFn(error);
  }
}
