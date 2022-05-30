import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import CONFIG from "@src/config";
import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";

import { ContextState } from "@src/types";

export async function sendPostToGroup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  const { debug } = ctx.state as ContextState;

  await ctx.replyWithChatAction("typing");

  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { messages, mediaGroup, tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  try {
    if (messages.length === 1) {
      await ctx.telegram.copyMessage(
        CONFIG.GROUP_ID!,
        messages[0].chat.id,
        messages[0].message_id
      );
    }

    if (messages.length > 1 && mediaGroup.length > 0) {
      mediaGroup[0].caption = [...tags].join("\n");

      await ctx.telegram.sendMediaGroup(CONFIG.GROUP_ID!, mediaGroup);
    }

    await ctx.deleteMessage();
    await ctx.answerCbQuery(BOT_MESSAGES.TAGS.POST_FORWARDED);

    await next();

    return;
  } catch (error) {
    debug(error);

    await ctx.reply(BOT_MESSAGES.ERROR);
    await ctx.answerCbQuery();
  }
}
