import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { MAIN_MENU } from "@src/constants";
import { createInlineKeyboard } from "@src/utils";

export async function setMainMenuMarkup(ctx: Context<Update>) {
  await ctx.answerCbQuery();

  const { reply_markup } = createInlineKeyboard(MAIN_MENU.structure);

  await ctx.editMessageReplyMarkup(reply_markup);
}
