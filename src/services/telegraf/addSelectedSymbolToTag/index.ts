import { Context, NarrowedContext } from "telegraf";
import * as tg from "telegraf/src/core/types/typegram";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";

import { ContextState } from "@src/types";

export async function addSelectedSymbolToTag(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  const { selectedTag } = ctx.state as ContextState;

  if (
    // Typing error in Telegraf.
    // Reply markup should exist on a message, but it does not.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !ctx.update.callback_query.message?.reply_markup ||
    !ctx.update.callback_query.data ||
    !selectedTag
  ) {
    void ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  // Typing error in Telegraf.
  // Reply markup should exist on a message, but it does not.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { reply_markup }: any = ctx.update.callback_query.message;
  const { inline_keyboard } = reply_markup as tg.InlineKeyboardMarkup;

  const updateIndex = inline_keyboard.findIndex((button) =>
    button[0].text?.includes(selectedTag.name)
  );

  inline_keyboard[updateIndex][0].text = `${selectedTag.name}${
    selectedTag.action === "ADD" ? ` ${BOT_MESSAGES.TAGS.SELECTED_SYMBOL}` : ""
  }`;

  await ctx.editMessageReplyMarkup({ inline_keyboard });

  await next();
}
