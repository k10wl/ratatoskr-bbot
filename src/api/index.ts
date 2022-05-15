import { Composer } from "telegraf";

import {
  replyToTextMessage,
  replyWithAnimation,
  replyWithMediaGroup,
  replyWithPhoto,
  replyWithVideo,
  sendMenuMessage,
} from "@src/services";

export function api() {
  const composer = new Composer();

  composer.on("photo", replyWithPhoto);
  composer.on("video", replyWithVideo);
  composer.on("animation", replyWithAnimation);

  composer.on(["photo", "video"], replyWithMediaGroup);

  composer.on(["photo", "video", "animation"], sendMenuMessage);

  composer.on("message", replyToTextMessage);

  return composer;
}
