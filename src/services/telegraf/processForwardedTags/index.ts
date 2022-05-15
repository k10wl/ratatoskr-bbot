import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { addNewTagGroup } from "@src/services";
import { parseTags } from "@src/utils";

export async function processForwardedTags(
  ctx: NarrowedContext<Context, MountMap["forward_date"]>,
  next: () => Promise<void>
) {
  if ("text" in ctx.message) {
    const tagsObject = parseTags(ctx.message.text);

    await Promise.all(tagsObject.map(async (group) => addNewTagGroup(group)));

    await ctx.reply(BOT_MESSAGES.TAGS.TAGS_UPDATED);
  } else {
    await next();
  }
}
