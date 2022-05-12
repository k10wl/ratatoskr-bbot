import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

export async function replyWithPhotoService(
  ctx: NarrowedContext<Context, MountMap["photo"]>,
  next: () => void
) {
  if (ctx.message.media_group_id) {
    return next();
  }

  await ctx.replyWithChatAction("upload_photo");
  const reply = await ctx.replyWithPhoto(
    ctx.message.photo[ctx.message.photo.length - 1].file_id
  );

  ctx.state.reply = [reply];

  await ctx.deleteMessage(ctx.message.message_id);

  next();
}
