import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import { findOneRegisteredUserById } from "@src/services";

export function checkInteractionPermission(): MiddlewareFn<Context<Update>> {
  return async (ctx, next) => {
    const canInteract = await findOneRegisteredUserById(ctx.from?.id);

    if (canInteract) {
      return next();
    }

    return ctx.reply(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  };
}
