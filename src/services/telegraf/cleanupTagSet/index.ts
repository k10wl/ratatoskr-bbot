import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { removeCurrentTagsSet } from "@src/services";

export function cleanupTagSet(
  ctx: NarrowedContext<Context, MountMap["callback_query"]>
) {
  void removeCurrentTagsSet(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message!
  );
}
