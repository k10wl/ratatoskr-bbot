import { Composer } from "telegraf";

import {
  replyWithAnimation,
  replyWithMediaGroup,
  replyWithPhoto,
  replyWithVideo,
  sendMenuMessage,
} from "@src/services";

export function replyWithMedia() {
  const composer = new Composer();

  composer.on("photo", replyWithPhoto);
  composer.on("video", replyWithVideo);
  composer.on("animation", replyWithAnimation);

  composer.on(["photo", "video"], replyWithMediaGroup);

  composer.on(["photo", "video", "animation"], sendMenuMessage);

  return composer;
}
