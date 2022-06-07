import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";

export async function replyWithInfo(
  ctx: NarrowedContext<Context, MountMap["text"]>
) {
  await ctx.reply(i18n.__(BOT_MESSAGES.INFO));
}
