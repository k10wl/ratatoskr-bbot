import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

// TODO: create service that will get all known users array from DB.
export const KNOWN_USERS_ID: number[] = [510632907];

export const CANT_INTERACT_MESSAGE =
  "You dont have right to interact with Ratatoskr. If you believe that this is a mistake - message developers.";

export function senderCanInteract(): MiddlewareFn<Context<Update>> {
  return (ctx, next) => {
    if (ctx.from?.id && KNOWN_USERS_ID.includes(ctx.from.id)) {
      return next();
    }
    return ctx.reply(CANT_INTERACT_MESSAGE);
  };
}
