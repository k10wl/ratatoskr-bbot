import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { TAG_GROUPS } from "@src/constants";
import { getTagsMenu } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export async function setTagsMenuMarkup(ctx: Context<Update>) {
  const tagsMenu = await getTagsMenu();

  const sortedTags = tagsMenu.sort((a, b) => a.originalIndex - b.originalIndex);

  const tagGroups = sortedTags.map((tag) => ({
    text: tag.groupName,
    callback: `getTagsByGroupId-${tag._id.toString()}`,
  }));

  const combinedMenuButtons = [...tagGroups, ...TAG_GROUPS.structure];

  const inlineKeyboard = createInlineKeyboard(combinedMenuButtons);

  await ctx.editMessageText(TAG_GROUPS.title, inlineKeyboard);

  await ctx.answerCbQuery();
}
