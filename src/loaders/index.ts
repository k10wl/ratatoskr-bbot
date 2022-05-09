import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { loadTelegraf } from "@src/loaders/telegraf";

export async function loadApp(
  telegraf: Telegraf,
  debug: Debugger
): Promise<void> {
  await loadTelegraf(telegraf, debug);
}
