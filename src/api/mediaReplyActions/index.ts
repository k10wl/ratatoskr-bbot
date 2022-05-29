import { Composer } from "telegraf";

import { SELECTED_TAGS, TAG_GROUPS } from "@src/constants";
import {
  saveTagInSet,
  setGroupTagsMenuMarkup,
  setSelectedTagsMenuMarkup,
  setTagsMenuMarkup,
} from "@src/services";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(TAG_GROUPS.path, setTagsMenuMarkup);

  composer.action(SELECTED_TAGS.path, setSelectedTagsMenuMarkup);

  composer.action(/^getTagsByGroupId-.*/, setGroupTagsMenuMarkup);

  composer.action(/^tagSelected-.*/, saveTagInSet);

  return composer;
}
