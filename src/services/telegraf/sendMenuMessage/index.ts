import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { TAG_GROUPS } from "@src/constants";
import { getCurrentTagsSet, getTagsMenu } from "@src/services";
import { createInlineKeyboard } from "@src/utils";

import { ContextState } from "@src/types";

export async function sendMenuMessage(
  ctx: NarrowedContext<Context, MountMap["photo" | "video" | "animation"]>,
  next: () => Promise<void>
) {
  const { reply, newMediaGroup } = ctx.state as ContextState;

  if (!reply || !reply.length) {
    return next();
  }

  const mongoTagsMenu = await getTagsMenu();

  const sortedTagsMenu = mongoTagsMenu.sort(
    (a, b) => a.originalIndex - b.originalIndex
  );

  const tagGroups = sortedTagsMenu.map((tag) => ({
    text: tag.groupName,
    callback: `getTagsByGroupId-${tag._id.toString()}`,
  }));

  const combinedMenuButtons = [...tagGroups, ...TAG_GROUPS.structure];

  const inlineKeyboard = createInlineKeyboard(combinedMenuButtons);

  const replyMessage = await ctx.reply(TAG_GROUPS.title, inlineKeyboard);

  getCurrentTagsSet({
    userId: ctx.from.id,
    message: replyMessage,
    replyMessages: reply,
    mediaGroup: newMediaGroup || [],
  });
}
