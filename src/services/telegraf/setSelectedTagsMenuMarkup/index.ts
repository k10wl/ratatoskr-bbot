import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, SELECTED_TAGS } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";
import { createInlineKeyboard, debug } from "@src/utils";

export async function setSelectedTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.update.callback_query.message) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    return;
  }

  const { tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  const tagsList = [...tags].map((tag) => {
    const [tagName] = tag.split(/\//gi);

    return {
      text: tags.has(tag)
        ? `${tagName} ${BOT_MESSAGES.POST_TAGS_SELECTED_SYMBOL}`
        : tagName,
      callback: `tagSelected/${tag}`,
    };
  });
  const inlineKeyboard = createInlineKeyboard([
    ...tagsList,
    ...SELECTED_TAGS.STRUCTURE,
  ]);

  try {
    await ctx.editMessageText(
      tags.size === 0 ? SELECTED_TAGS.NO_SELECTED_TAGS : SELECTED_TAGS.TITLE,
      inlineKeyboard
    );

    await ctx.answerCbQuery();
  } catch (error) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    debug(error);
  }
}
