import { Composer } from "telegraf";

import { MAIN_MENU, SELECTED_TAGS } from "@src/constants";
import { setMainMenuMarkup } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(MAIN_MENU.path, setMainMenuMarkup);

  // TODO: refactor into service
  composer.action(SELECTED_TAGS.path, async (ctx) => {
    await ctx.answerCbQuery();

    const { reply_markup } = createInlineKeyboard(SELECTED_TAGS.structure);

    await ctx.editMessageReplyMarkup(reply_markup);
  });

  return composer;
}
