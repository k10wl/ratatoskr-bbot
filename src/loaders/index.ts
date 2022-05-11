import { Debugger } from "debug";
import { Telegraf } from "telegraf";

import { loadMongoose } from "./mongoose";
import { loadTelegraf } from "./telegraf";

export async function loadApp(
  telegraf: Telegraf,
  debug: Debugger
): Promise<void> {
  await loadMongoose(debug);
  await loadTelegraf(telegraf, debug);
}
