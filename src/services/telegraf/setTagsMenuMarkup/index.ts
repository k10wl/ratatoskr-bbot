import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { TAG_GROUPS } from "@src/constants";
import { getTagsMenu } from "@src/services";
import { ButtonT, createInlineKeyboard } from "@src/utils";

export async function setTagsMenuMarkup(ctx: Context<Update>) {
  const tagsMenu = await getTagsMenu();

  const sortedTags = tagsMenu.sort((a, b) => a.originalIndex - b.originalIndex);

  const tagGroups: ButtonT[] = sortedTags.map((tag) => ({
    text: tag.groupName,
    callback: tag._id.toString(),
  }));

  const tagMenuFormed = createInlineKeyboard(tagGroups);

  const baseButtons = createInlineKeyboard(TAG_GROUPS.structure);

  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      ...tagMenuFormed.reply_markup.inline_keyboard,
      ...baseButtons.reply_markup.inline_keyboard,
    ],
  });

  await ctx.answerCbQuery();
}
