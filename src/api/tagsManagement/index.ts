import { Composer } from "telegraf";

import { getTagsGroupAndMessage, processForwardedTags } from "@src/services";

export function tagsManagement() {
  const composer = new Composer();

  composer.on("forward_date", getTagsGroupAndMessage, processForwardedTags);

  return composer;
}
