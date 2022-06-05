import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";

export async function replyToTextMessage(
  ctx: NarrowedContext<Context, MountMap["message"]>,
  next: () => Promise<void>
): Promise<void> {
  if (
    "photo" in ctx.message ||
    "video" in ctx.message ||
    "animation" in ctx.message ||
    ("text" in ctx.message && ctx.message.text[0] === "/")
  ) {
    return next();
  }

  let countdown = BOT_MESSAGES.TEXT_REACTION_COUNTDOWN_SECONDS;

  const replyMessage = await ctx.reply(
    `${i18n.__(BOT_MESSAGES.TEXT_REACTION_PREFIX)} ${countdown} ${i18n.__(
      BOT_MESSAGES.TEXT_REACTION_SUFFIX
    )}`
  );

  await ctx.deleteMessage(ctx.message.message_id);

  const interval = setInterval(async () => {
    countdown -= BOT_MESSAGES.TEXT_REACTION_COUNTDOWN_STEP_SECONDS;
    await ctx.telegram.editMessageText(
      replyMessage.chat.id,
      replyMessage.message_id,
      undefined,
      `${i18n.__(BOT_MESSAGES.TEXT_REACTION_PREFIX)} ${countdown} ${i18n.__(
        BOT_MESSAGES.TEXT_REACTION_SUFFIX
      )}`
    );
  }, BOT_MESSAGES.TEXT_REACTION_COUNTDOWN_STEP_SECONDS * 1000);

  setTimeout(async () => {
    clearInterval(interval);
    await ctx.deleteMessage(replyMessage.message_id);
  }, BOT_MESSAGES.TEXT_REACTION_COUNTDOWN_SECONDS * 1000);
}
