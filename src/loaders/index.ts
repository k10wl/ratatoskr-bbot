import { Telegraf } from "telegraf";

import { loadExpress } from "./express";
import { loadI18n } from "./i18n";
import { loadMongoose } from "./mongoose";
import { loadTelegraf } from "./telegraf";

export async function loadApp(telegraf: Telegraf): Promise<void> {
  loadI18n();
  await loadMongoose();
  loadTelegraf(telegraf);
  loadExpress(telegraf);
}
