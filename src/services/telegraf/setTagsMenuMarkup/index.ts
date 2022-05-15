import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { TAG_GROUPS } from "@src/constants";
import { getTagsMenu } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export async function setTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
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
