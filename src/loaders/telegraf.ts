import { Debugger } from "debug";
import { Telegraf } from "telegraf";

export async function loadTelegraf(telegraf: Telegraf, debug: Debugger) {
  try {
    await telegraf.launch();
  } catch (error) {
    debug(error);
  }
}
