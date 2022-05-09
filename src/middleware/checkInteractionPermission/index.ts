import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

// TODO: create service that will get all known users array from DB.
export const HAS_INTERACTION_PERMISSION: number[] = [510632907];

export const CANT_INTERACT_MESSAGE =
  "You dont have right to interact with Ratatoskr.\nIf you believe that this is a mistake - message developers.";

export function checkInteractionPermission(): MiddlewareFn<Context<Update>> {
  return (ctx, next) => {
    if (ctx.from?.id && HAS_INTERACTION_PERMISSION.includes(ctx.from.id)) {
      return next();
    }

    return ctx.reply(CANT_INTERACT_MESSAGE);
  };
}
