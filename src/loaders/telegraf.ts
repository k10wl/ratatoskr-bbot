import { Telegraf } from "telegraf";

export async function loadTelegraf(telegraf: Telegraf) {
  try {
    telegraf.use();

    await telegraf.launch();
  } catch (error) {
    console.error(error);
  }
}
