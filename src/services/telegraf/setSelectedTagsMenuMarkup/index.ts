import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { SELECTED_TAGS } from "@src/constants";
import { createInlineKeyboard } from "@src/utils";

export async function setSelectedTagsMenuMarkup(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const inlineKeyboard = createInlineKeyboard(SELECTED_TAGS.structure);

  await ctx.editMessageText(SELECTED_TAGS.title, inlineKeyboard);

  await ctx.answerCbQuery();
}
