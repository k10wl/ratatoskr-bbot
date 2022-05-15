import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { MAIN_MENU } from "@src/constants";
import { createInlineKeyboard } from "@src/utils";

export async function setMainMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const inlineKeyboard = createInlineKeyboard(MAIN_MENU.structure);

  await ctx.editMessageText(MAIN_MENU.title, inlineKeyboard);

  await ctx.answerCbQuery();
}
