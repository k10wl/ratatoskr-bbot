import { Composer } from "telegraf";

import { replyToTextMessage, replyWithInfo } from "@src/services";

import { mediaReplyActions } from "./mediaReplyActions";
import { replyWithMedia } from "./replyWithMedia";
import { tagsManagement } from "./tagsManagement";

export function api() {
  const composer = new Composer();

  composer.use(replyWithMedia());
  composer.use(mediaReplyActions());
  composer.use(tagsManagement());

  composer.on("text", replyToTextMessage);

  composer.command("info", replyWithInfo);

  return composer;
}
