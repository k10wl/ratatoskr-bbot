import { Composer } from "telegraf";

import { MAIN_MENU, SELECTED_TAGS, TAG_GROUPS } from "@src/constants";
import {
  setGroupTagsMenuMarkup,
  setMainMenuMarkup,
  setTagsMenuMarkup,
} from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(MAIN_MENU.path, setMainMenuMarkup);

  // TODO: refactor into service
  composer.action(SELECTED_TAGS.path, async (ctx) => {
    const inlineKeyboard = createInlineKeyboard(SELECTED_TAGS.structure);

    await ctx.editMessageText(SELECTED_TAGS.title, inlineKeyboard);

    await ctx.answerCbQuery();
  });

  composer.action(TAG_GROUPS.path, setTagsMenuMarkup);

  composer.action(/^getTagsByGroupId-.*/, setGroupTagsMenuMarkup);

  return composer;
}
