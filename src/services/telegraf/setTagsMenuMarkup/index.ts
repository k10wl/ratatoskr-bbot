import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, MENU_ROOT } from "@src/constants";
import { getTagsMenu } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

import { ContextState } from "@src/types";

export async function setTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const { debug } = ctx.state as ContextState;

  const tagsMenu = await getTagsMenu();

  const sortedTags = tagsMenu.sort((a, b) => a.originalIndex - b.originalIndex);

  const tagGroups = sortedTags.map((tag) => ({
    text: tag.groupName,
    callback: `getTagsByGroupId/${tag._id.toString()}`,
  }));
  debug(tagGroups, "TAG GROUPS");

  const combinedMenuButtons = [...tagGroups, ...MENU_ROOT.STRUCTURE];

  const inlineKeyboard = createInlineKeyboard(combinedMenuButtons);
  try {
    await ctx.editMessageText(MENU_ROOT.TITLE, inlineKeyboard);

    await ctx.answerCbQuery();
  } catch (error) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    debug(error);
  }
}
