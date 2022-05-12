import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { ChatsMapT, createMediaGroup } from "./createMediaGroup";

const chatsMap: ChatsMapT = new Map();

export async function replyWithMediaGroupService(
  ctx: NarrowedContext<Context, MountMap["photo" | "video"]>,
  next: () => void
) {
  if (!ctx.message.media_group_id) {
    return next();
  }

  const { newMediaGroup, originalMediaGroup, creatingMediaGroup } =
    await createMediaGroup(chatsMap, ctx);

  if (creatingMediaGroup) {
    await ctx.replyWithChatAction("upload_photo");

    return;
  }

  await ctx.replyWithMediaGroup(newMediaGroup);

  originalMediaGroup.forEach((message) => {
    void ctx.telegram.deleteMessage(message.chat.id, message.message_id);
  });
}
