import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { loadMongoose } from "@src/loaders/mongoose";
import { loadTelegraf } from "@src/loaders/telegraf";

export async function loadApp(
  telegraf: Telegraf,
  debug: Debugger
): Promise<void> {
  await loadMongoose(debug);
  await loadTelegraf(telegraf, debug);
}
