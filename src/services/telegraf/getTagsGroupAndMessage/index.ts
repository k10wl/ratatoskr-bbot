import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { GroupInfo } from "@src/models";

export async function getTagsGroupAndMessage(
  ctx: NarrowedContext<Context, MountMap["forward_date"]>,
  next: () => Promise<void>
) {
  const groupInfo = await GroupInfo.find();

  if (
    ctx.message.forward_from_chat &&
    ctx.message.forward_from_chat.id === groupInfo[0].groupId &&
    ctx.message.forward_from_message_id === groupInfo[0].tagsMessageId &&
    "text" in ctx.message
  ) {
    return next();
  }

  await ctx.reply(BOT_MESSAGES.TAGS.WRONG_MESSAGE);
}
