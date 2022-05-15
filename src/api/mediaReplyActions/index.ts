import { Composer } from "telegraf";

import { MAIN_MENU, SELECTED_TAGS, TAG_GROUPS } from "@src/constants";
import { setMainMenuMarkup, setTagsMenuMarkup } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(MAIN_MENU.path, setMainMenuMarkup);

  // TODO: refactor into service
  composer.action(SELECTED_TAGS.path, async (ctx) => {
    const { reply_markup } = createInlineKeyboard(SELECTED_TAGS.structure);

    await ctx.editMessageReplyMarkup(reply_markup);

    await ctx.answerCbQuery();
  });

  composer.action(TAG_GROUPS.path, setTagsMenuMarkup);

  return composer;
}
