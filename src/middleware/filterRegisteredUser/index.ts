import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import { findOneRegisteredUserById } from "@src/services";

export function filterRegisteredUser(): MiddlewareFn<Context<Update>> {
  return async (ctx, next) => {
    const registeredUser = await findOneRegisteredUserById(ctx.from?.id);

    if (registeredUser) {
      return next();
    }

    return ctx.reply(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  };
}
