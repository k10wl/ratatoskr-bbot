import { Composer } from "telegraf";

import { MENU_ROOT, SELECTED_TAGS } from "@src/constants";
import {
  addSelectedSymbolToTag,
  addTagToMedia,
  addTagToStatistic,
  canselPost,
  cleanupTagSet,
  saveTagInSet,
  sendPostToGroup,
  setGroupTagsMenuMarkup,
  setSelectedTagsMenuMarkup,
  setTagsMenuMarkup,
} from "@src/services";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(MENU_ROOT.PATH, setTagsMenuMarkup);

  composer.action(SELECTED_TAGS.PATH, setSelectedTagsMenuMarkup);

  composer.action(/^getTagsByGroupId\/.*/, setGroupTagsMenuMarkup);

  composer.action(
    /^tagSelected\/.*/,
    saveTagInSet,
    addSelectedSymbolToTag,
    addTagToMedia
  );

  composer.action("cancel", canselPost, cleanupTagSet);
  composer.action(
    "send_post",
    sendPostToGroup,
    addTagToStatistic,
    cleanupTagSet
  );

  return composer;
}
