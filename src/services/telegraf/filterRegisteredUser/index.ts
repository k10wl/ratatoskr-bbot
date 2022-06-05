import i18n from "i18n";
import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";

import { ContextState } from "@src/types";

export async function filterRegisteredUser(
  ctx: Context<Update>,
  next: () => void
) {
  const { user } = ctx.state as ContextState;

  if (user.isRegistered) {
    return next();
  }

  await ctx.reply(i18n.__(BOT_MESSAGES.CANT_INTERACT_MESSAGE));
}
