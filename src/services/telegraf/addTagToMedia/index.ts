import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentMessageMap } from "@src/services";

export async function addTagToMedia(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { messages, tags } = getCurrentMessageMap(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  await ctx.telegram.editMessageCaption(
    messages[0].chat.id,
    messages[0].message_id,
    undefined,
    [...tags].join("\n")
  );

  await ctx.answerCbQuery();
}
