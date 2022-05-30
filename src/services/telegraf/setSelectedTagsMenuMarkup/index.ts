import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, SELECTED_TAGS } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

import { ContextState } from "@src/types";

export async function setSelectedTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const { debug } = ctx.state as ContextState;

  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

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
        ? `${tagName} ${BOT_MESSAGES.TAGS.SELECTED_SYMBOL}`
        : tagName,
      callback: `tagSelected/${tag}`,
    };
  });
  const inlineKeyboard = createInlineKeyboard([
    ...tagsList,
    ...SELECTED_TAGS.structure,
  ]);

  try {
    await ctx.editMessageText(
      tags.size === 0 ? SELECTED_TAGS.noSelectedTags : SELECTED_TAGS.title,
      inlineKeyboard
    );

    await ctx.answerCbQuery();
  } catch (error) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    debug(error);
  }
}
