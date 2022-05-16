import { Composer } from "telegraf";

import { tagsManagement } from "@src/api/tagsManagement";
import { replyToTextMessage } from "@src/services";

import { mediaReplyActions } from "./mediaReplyActions";
import { replyWithMedia } from "./replyWithMedia";

export function api() {
  const composer = new Composer();

  composer.use(replyWithMedia());
  composer.use(mediaReplyActions());

  composer.use(tagsManagement());

  composer.on("message", replyToTextMessage);

  return composer;
}
