import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export const KNOWN_USERS_ID: number[] = [510632907];

export const CANT_INTERACT_MESSAGE =
  "You cannot send messages to this bot. If you believe that this is a mistake - message to developers.";

export function senderCanInteract(): MiddlewareFn<Context<Update>> {
  return (ctx, next) => {
    if (ctx.from?.id && KNOWN_USERS_ID.includes(ctx.from.id)) {
      return next();
    }
    return ctx.reply(CANT_INTERACT_MESSAGE);
  };
}
