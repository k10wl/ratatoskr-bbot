import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import {
  getCurrentTagsSet,
  removeCurrentTagsSet,
  storeUsageStatistics,
} from "@src/services";

export function addTagToStatistic(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  const { tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message!,
  });

  [...tags].forEach((tagGroupString) => {
    const [tag, group] = tagGroupString.split(/\//);

    return void storeUsageStatistics({ group, tag });
  });

  void removeCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message!
  );
}
