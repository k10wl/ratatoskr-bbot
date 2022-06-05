import i18n from "i18n";
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
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    return;
  }

  const { messages, tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  const tagNames = [...tags].map((tag) => {
    const [tagName] = tag.split(/\//gi);

    return tagName;
  });

  try {
    await ctx.telegram.editMessageCaption(
      messages[0].chat.id,
      messages[0].message_id,
      undefined,
      tagNames.join("\n")
    );
  } catch (error) {
    debug(error);

    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));
  }

  await ctx.answerCbQuery();
}
