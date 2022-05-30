import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";

import { ContextState } from "@src/types";

export async function addTagToMedia(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const { debug } = ctx.state as ContextState;

  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { messages, tags } = getCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  try {
    await ctx.telegram.editMessageCaption(
      messages[0].chat.id,
      messages[0].message_id,
      undefined,
      [...tags].join("\n")
    );
  } catch (error) {
    debug(error);

    await ctx.reply(BOT_MESSAGES.ERROR);
  }

  await ctx.answerCbQuery();
}
