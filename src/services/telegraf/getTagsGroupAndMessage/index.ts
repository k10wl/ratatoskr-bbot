import i18n from "i18n";
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

  await ctx.reply(i18n.__(BOT_MESSAGES.TAGS_WRONG_MESSAGE));
}
