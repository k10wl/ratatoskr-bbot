import { Composer } from "telegraf";

import { MAIN_MENU, SELECTED_TAGS, TAG_GROUPS } from "@src/constants";
import {
  setGroupTagsMenuMarkup,
  setMainMenuMarkup,
  setSelectedTagsMenuMarkup,
  setTagsMenuMarkup,
} from "@src/services";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(MAIN_MENU.path, setMainMenuMarkup);

  composer.action(SELECTED_TAGS.path, setSelectedTagsMenuMarkup);

  composer.action(TAG_GROUPS.path, setTagsMenuMarkup);

  composer.action(/^getTagsByGroupId-.*/, setGroupTagsMenuMarkup);

  return composer;
}
