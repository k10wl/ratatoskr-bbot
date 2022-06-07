import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { CONSOLE_STATEMENTS } from "@src/constants";
import {
  getCurrentTagsSet,
  getOneTagGroupByOriginalIndex,
  storeUsageStatistics,
} from "@src/services";
import { debug } from "@src/utils";

export async function addTagToStatistic(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>,
  next: () => Promise<void>
) {
  const { tags } = getCurrentTagsSet({
    userId: ctx.update.callback_query.from.id,
    message: ctx.update.callback_query.message!,
  });

  [...tags].forEach(async (tagGroupString) => {
    const [tag, groupIndex] = tagGroupString.split(/\//);

    const tagGroup = await getOneTagGroupByOriginalIndex(groupIndex);

    if (!tagGroup) {
      debug(CONSOLE_STATEMENTS.MONGOOSE.NO_DATA_FOUND);

      return;
    }

    await storeUsageStatistics({ group: tagGroup.groupName, tag });
  });

  await next();
}
