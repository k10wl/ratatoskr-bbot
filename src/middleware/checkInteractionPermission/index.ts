import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";

// TODO: create service that will get all known users array from DB.
export const HAS_INTERACTION_PERMISSION: number[] = [5106329070];

export function checkInteractionPermission(): MiddlewareFn<Context<Update>> {
  return (ctx, next) => {
    if (ctx.from?.id && HAS_INTERACTION_PERMISSION.includes(ctx.from.id)) {
      return next();
    }

    return ctx.reply(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  };
}
