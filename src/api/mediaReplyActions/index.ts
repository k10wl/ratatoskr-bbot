import { Composer } from "telegraf";

import { SELECTED_TAGS, TAG_GROUPS } from "@src/constants";
import {
  addSelectedSymbolToTag,
  addTagToMedia,
  canselPost,
  saveTagInSet,
  sendPostToGroup,
  setGroupTagsMenuMarkup,
  setSelectedTagsMenuMarkup,
  setTagsMenuMarkup,
} from "@src/services";

export function mediaReplyActions() {
  const composer = new Composer();

  composer.action(TAG_GROUPS.path, setTagsMenuMarkup);

  composer.action(SELECTED_TAGS.path, setSelectedTagsMenuMarkup);

  composer.action(/^getTagsByGroupId-.*/, setGroupTagsMenuMarkup);

  composer.action(
    /^tagSelected-.*/,
    saveTagInSet,
    addSelectedSymbolToTag,
    addTagToMedia
  );

  composer.action("cancel", canselPost);
  composer.action("send_post", sendPostToGroup);

  return composer;
}
