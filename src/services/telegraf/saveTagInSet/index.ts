import i18n from "i18n";
import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";

export async function saveTagInSet(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  if (!ctx.update.callback_query.data || !ctx.update.callback_query.message) {
    await ctx.reply(i18n.__(BOT_MESSAGES.ERROR));

    return;
  }

  const { tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message,
  });

  const [, userChoseTag, tagGroup] =
    ctx.update.callback_query.data.split(/\//gi);

  if (tags.has(`${userChoseTag}/${tagGroup}`)) {
    tags.delete(`${userChoseTag}/${tagGroup}`);
    ctx.state.selectedTag = {
      name: userChoseTag,
      group: tagGroup,
      action: "REMOVE",
    };
  } else {
    tags.add(`${userChoseTag}/${tagGroup}`);
    ctx.state.selectedTag = {
      name: userChoseTag,
      group: tagGroup,
      action: "ADD",
    };
  }

  await next();
}
