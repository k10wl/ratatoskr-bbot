import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentMessageMap } from "@src/services";

export async function saveTagInSet(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  if (!ctx.update.callback_query.data || !ctx.update.callback_query.message) {
    await ctx.reply(BOT_MESSAGES.ERROR);

    return;
  }

  const { tags } = getCurrentMessageMap(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message
  );

  const [, userChoseTag] = ctx.update.callback_query.data.split("-");

  if (tags.has(userChoseTag)) {
    tags.delete(userChoseTag);
    ctx.state.selectedTag = { name: userChoseTag, action: "REMOVE" };
  } else {
    tags.add(userChoseTag);
    ctx.state.selectedTag = { name: userChoseTag, action: "ADD" };
  }

  await next();
}
