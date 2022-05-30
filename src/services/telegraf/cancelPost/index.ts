import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet, removeCurrentTagsSet } from "@src/services";

export async function canselPost(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { messages } = getCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  removeCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  messages.forEach((message) => void ctx.deleteMessage(message.message_id));

  await ctx.answerCbQuery(BOT_MESSAGES.TAGS.CANCELED);

  await ctx.deleteMessage();
}
