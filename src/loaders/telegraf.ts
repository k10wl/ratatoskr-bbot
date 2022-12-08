import { Telegraf } from "telegraf";

import { api } from "@src/api";
import CONFIG from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { auth } from "@src/middleware";
import { debug } from "@src/utils";

export async function loadTelegraf(telegraf: Telegraf) {
  try {
    telegraf.use(auth());
    telegraf.use(api());

    if (CONFIG.URL) {
      await telegraf.launch({
        webhook: {
          domain: `${CONFIG.URL}/bot${CONFIG.BOT_TOKEN as string}`,
          port: CONFIG.PORT,
        },
      });
    } else {
      await telegraf.launch();
    }

    debug(CONSOLE_STATEMENTS.TELEGRAF.LAUNCH.SUCCESS);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.TELEGRAF.LAUNCH.ERROR);
    debug(error);
  }
}
