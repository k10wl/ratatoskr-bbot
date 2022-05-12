import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

export async function replyWithAnimationService(
  ctx: NarrowedContext<Context, MountMap["animation"]>,
  next: () => void
) {
  if (ctx.message.media_group_id) {
    return next();
  }

  await ctx.replyWithChatAction("upload_document");
  const reply = await ctx.replyWithAnimation(ctx.message.animation.file_id);

  ctx.state.reply = [reply];

  await ctx.deleteMessage(ctx.message.message_id);
}
