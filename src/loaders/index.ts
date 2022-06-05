import { Telegraf } from "telegraf";

import { loadI18n } from "@src/loaders/i18n";

import { loadMongoose } from "./mongoose";
import { loadTelegraf } from "./telegraf";

export async function loadApp(telegraf: Telegraf): Promise<void> {
  loadI18n();
  await loadMongoose();
  await loadTelegraf(telegraf);
}
