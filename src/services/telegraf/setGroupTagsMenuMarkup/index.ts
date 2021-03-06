import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, ONE_GROUP_FOOTER_BUTTONS } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";
import { getOneTagGroupById } from "@src/services/mongoose/getOneTagGroupById";
import { createInlineKeyboard, debug } from "@src/utils";

export async function setGroupTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.callbackQuery.data) {
    return ctx.reply(i18n.__(BOT_MESSAGES.ERROR));
  }

  const groupId = ctx.callbackQuery.data.split(/\//gi)[1];

  const tagGroup = await getOneTagGroupById(groupId);
  if (!tagGroup || !ctx.update.callback_query.message) {
    return ctx.reply(i18n.__(BOT_MESSAGES.ERROR));
  }

  const { tags: storedTags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  const { tags, groupName, originalIndex } = tagGroup;

  const tagsList = tags.map(({ tag }) => ({
    text: storedTags.has(`${tag}/${originalIndex}`)
      ? `${tag} ${BOT_MESSAGES.POST_TAGS_SELECTED_SYMBOL}`
      : tag,
    callback: `tagSelected/${tag}/${originalIndex}`,
  }));

  const mapMenu = [...tagsList, ...ONE_GROUP_FOOTER_BUTTONS];

  const inlineKeyboard = createInlineKeyboard(mapMenu);

  try {
    await ctx.editMessageText(
      `Currently browsing: ${groupName}`,
      inlineKeyboard
    );

    await ctx.answerCbQuery();
  } catch (error) {
    debug("caught error");
    debug(error);
  }
}
