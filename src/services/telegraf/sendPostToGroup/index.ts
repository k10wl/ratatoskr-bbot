import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import CONFIG from "@src/config";
import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";
import { debug } from "@src/utils";

export async function sendPostToGroup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  await ctx.replyWithChatAction("typing");

  if (!ctx.update.callback_query.message) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

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
      const mappedTags = [...tags].map((tagInstance) => {
        const [tag] = tagInstance.split("/");

        return tag;
      });

      mediaGroup[0].caption = mappedTags.join("\n");

      await ctx.telegram.sendMediaGroup(CONFIG.GROUP_ID!, mediaGroup);
    }

    await ctx.deleteMessage();
    await ctx.answerCbQuery(i18n.__(BOT_MESSAGES.POST_FORWARDED));

    await next();

    return;
  } catch (error) {
    debug(error);

    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));
    await ctx.answerCbQuery();
  }
}
