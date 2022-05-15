import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";

import { ContextState } from "@src/types";

export async function sendMenuMessage(
  ctx: NarrowedContext<Context, MountMap["photo" | "video" | "animation"]>,
  next: () => Promise<void>
) {
  const { reply } = ctx.state as ContextState;

  if (!reply || !reply.length) {
    return next();
  }

  await ctx.reply(BOT_MESSAGES.MENU.MAIN_MENU);
}
