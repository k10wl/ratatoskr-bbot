import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { MAIN_MENU } from "@src/constants";
import { createInlineKeyboard } from "@src/utils";

import { ContextState } from "@src/types";

export async function sendMenuMessage(
  ctx: NarrowedContext<Context, MountMap["photo" | "video" | "animation"]>,
  next: () => Promise<void>
) {
  const { reply } = ctx.state as ContextState;

  if (!reply || !reply.length) {
    return next();
  }

  const inlineKeyboard = createInlineKeyboard(MAIN_MENU.structure);

  await ctx.reply(MAIN_MENU.title, inlineKeyboard);
}
