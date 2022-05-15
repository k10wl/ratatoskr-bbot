import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { ONE_GROUP_FOOTER_BUTTONS } from "@src/constants";
import { getOneTagGroupById } from "@src/services/mongoose/getOneTagGroupById";
import { createInlineKeyboard } from "@src/utils";

export async function setGroupTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  if (!ctx.callbackQuery.data) {
    return next();
  }

  const groupId = ctx.callbackQuery.data.split("-")[1];

  const tagGroup = await getOneTagGroupById(groupId);

  if (!tagGroup) {
    return ctx.reply("Something went wrong.");
  }

  const { tags, groupName } = tagGroup;

  const tagsList = tags.map(({ tag, _id }) => ({
    text: tag,
    callback: _id?.toString() || "root",
  }));

  const mapMenu = [...tagsList, ...ONE_GROUP_FOOTER_BUTTONS];

  const inlineKeyboard = createInlineKeyboard(mapMenu);

  await ctx.editMessageText(`Currently browsing: ${groupName}`, inlineKeyboard);

  await ctx.answerCbQuery();
}
