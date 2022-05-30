import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES, SELECTED_TAGS } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

export async function setSelectedTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  if (!ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { tags } = getCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  const tagsList = [...tags].map((tag) => ({
    text: tags.has(tag) ? `${tag} ${BOT_MESSAGES.TAGS.SELECTED_SYMBOL}` : tag,
    callback: `tagSelected-${tag}`,
  }));
  const inlineKeyboard = createInlineKeyboard([
    ...tagsList,
    ...SELECTED_TAGS.structure,
  ]);

  await ctx.editMessageText(
    tags.size === 0 ? SELECTED_TAGS.noSelectedTags : SELECTED_TAGS.title,
    inlineKeyboard
  );

  await ctx.answerCbQuery();
}
