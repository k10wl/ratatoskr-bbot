import i18n from "i18n";
import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import { findOneRegisteredUserById } from "@src/services";

import { UserT } from "@src/types";

export async function addUserToState(ctx: Context<Update>, next: () => void) {
  if (!ctx.from) {
    return ctx.reply(i18n.__(BOT_MESSAGES.CANT_INTERACT_MESSAGE));
  }

  const user: UserT = {
    ...ctx.from,
    isRegistered: false,
  };

  const registeredUser = await findOneRegisteredUserById(ctx.from.id);

  if (registeredUser) {
    user.isRegistered = true;
  }

  ctx.state.user = user;

  next();
}
