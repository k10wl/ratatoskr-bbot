import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, ONE_GROUP_FOOTER_BUTTONS } from "@src/constants";
import { getOneTagGroupById } from "@src/services/mongoose/getOneTagGroupById";
import { createInlineKeyboard } from "@src/utils";

export async function setGroupTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.callbackQuery.data) {
    return ctx.reply(BOT_MESSAGES.ERROR);
  }

  const groupId = ctx.callbackQuery.data.split("-")[1];

  const tagGroup = await getOneTagGroupById(groupId);

  if (!tagGroup) {
    return ctx.reply(BOT_MESSAGES.ERROR);
  }

  const { tags, groupName } = tagGroup;

  const tagsList = tags.map(({ tag }) => ({
    text: tag,
    callback: `tagSelected-${tag}`,
  }));

  const mapMenu = [...tagsList, ...ONE_GROUP_FOOTER_BUTTONS];

  const inlineKeyboard = createInlineKeyboard(mapMenu);

  await ctx.editMessageText(`Currently browsing: ${groupName}`, inlineKeyboard);

  await ctx.answerCbQuery();
}
