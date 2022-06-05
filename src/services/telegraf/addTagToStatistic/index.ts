import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";
import { createDeflateRaw } from "zlib";

import {
  getCurrentTagsSet,
  removeCurrentTagsSet,
  storeUsageStatistics,
} from "@src/services";

export async function addTagToStatistic(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  const { tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message!,
  });

  [...tags].forEach((tagGroupString) => {
    const [tag, group] = tagGroupString.split(/\//);

    void storeUsageStatistics({ group, tag });
  });

  await next();
}
