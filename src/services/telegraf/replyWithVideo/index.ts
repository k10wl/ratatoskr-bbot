import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

export async function replyWithVideo(
  ctx: NarrowedContext<Context, MountMap["video"]>,
  next: () => void
) {
  if (ctx.message.media_group_id) {
    return next();
  }

  await ctx.replyWithChatAction("upload_video");
  const reply = await ctx.replyWithVideo(ctx.message.video.file_id);

  ctx.state.reply = [reply];

  await ctx.deleteMessage(ctx.message.message_id);

  next();
}
