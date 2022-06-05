import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet, removeCurrentTagsSet } from "@src/services";
import { debug } from "@src/utils";

export async function canselPost(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.update.callback_query.message) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    return;
  }

  const { messages } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  removeCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  try {
    messages.forEach((message) => void ctx.deleteMessage(message.message_id));

    await ctx.answerCbQuery(i18n.__(BOT_MESSAGES.POST_CANCELED));

    await ctx.deleteMessage();
  } catch (error) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    await ctx.answerCbQuery();

    debug(error);
  }
}
