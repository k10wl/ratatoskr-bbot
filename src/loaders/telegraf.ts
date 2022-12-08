import { Telegraf } from "telegraf";

import { api } from "@src/api";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { auth } from "@src/middleware";
import { debug } from "@src/utils";

export function loadTelegraf(telegraf: Telegraf) {
  try {
    telegraf.use(auth());
    telegraf.use(api());

    debug(CONSOLE_STATEMENTS.TELEGRAF.LAUNCH.SUCCESS);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.TELEGRAF.LAUNCH.ERROR);
    debug(error);
  }
}
