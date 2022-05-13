import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import { findOneRegisteredUserById } from "@src/services";

export async function filterRegisteredUser(
  ctx: Context<Update>,
  next: () => void
) {
  const registeredUser = await findOneRegisteredUserById(ctx.from?.id);

  if (registeredUser) {
    return next();
  }

  await ctx.reply(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
}
