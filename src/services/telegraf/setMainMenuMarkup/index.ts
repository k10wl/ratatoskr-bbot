import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { MAIN_MENU } from "@src/constants";
import { createInlineKeyboard } from "@src/utils";

export async function setMainMenuMarkup(ctx: Context<Update>) {
  const inlineKeyboard = createInlineKeyboard(MAIN_MENU.structure);

  await ctx.editMessageText(MAIN_MENU.title, inlineKeyboard);

  await ctx.answerCbQuery();
}
