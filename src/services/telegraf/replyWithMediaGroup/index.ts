import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { ChatsMapT, createMediaGroup } from "./createMediaGroup";

const chatsMap: ChatsMapT = new Map();

export async function replyWithMediaGroup(
  ctx: NarrowedContext<Context, MountMap["photo" | "video"]>,
  next: () => void
) {
  if (!ctx.message.media_group_id) {
    return next();
  }

  const { newMediaGroup, originalMediaGroup, creatingMediaGroup } =
    await createMediaGroup(chatsMap, ctx);

  if (creatingMediaGroup || newMediaGroup.length < 2) {
    await ctx.replyWithChatAction("upload_photo");

    return;
  }

  ctx.state.reply = await ctx.replyWithMediaGroup(newMediaGroup);
  ctx.state.newMediaGroup = newMediaGroup;

  originalMediaGroup.forEach((message) => {
    void ctx.deleteMessage(message.message_id);
  });

  next();
}
