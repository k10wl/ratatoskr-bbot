import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { addNewTagGroup, dropTagGroups } from "@src/services";
import { parseTags } from "@src/utils";

export async function processForwardedTags(
  ctx: NarrowedContext<Context, MountMap["forward_date"]>,
  next: () => Promise<void>
) {
  if (!("text" in ctx.message)) {
    return next();
  }

  const tagsObject = parseTags(ctx.message.text);

  const reply = await ctx.reply(BOT_MESSAGES.TAGS.UPDATING_TAGS);

  let dots = "";
  const interval = setInterval(() => {
    if (dots.length === 5) {
      dots = "";
    } else {
      dots += ".";
    }

    void ctx.telegram.editMessageText(
      reply.chat.id,
      reply.message_id,
      undefined,
      `${reply.text}${dots}`
    );
  }, 300);

  await dropTagGroups();

  try {
    await Promise.all(tagsObject.map(async (group) => addNewTagGroup(group)));

    clearInterval(interval);

    await ctx.telegram.editMessageText(
      reply.chat.id,
      reply.message_id,
      undefined,
      BOT_MESSAGES.TAGS.TAGS_UPDATED
    );
  } catch (error) {
    await ctx.telegram.editMessageText(
      reply.chat.id,
      reply.message_id,
      undefined,
      BOT_MESSAGES.ERROR
    );
  }
}
