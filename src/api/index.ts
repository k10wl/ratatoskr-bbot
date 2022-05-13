import { Composer } from "telegraf";

import {
  replyToTextMessage,
  replyWithAnimation,
  replyWithMediaGroup,
  replyWithPhoto,
  replyWithVideo,
} from "@src/services";

import { ContextState } from "@src/types";

export function api() {
  const composer = new Composer();

  composer.on("photo", replyWithPhoto);
  composer.on("video", replyWithVideo);
  composer.on("animation", replyWithAnimation);

  composer.on(["photo", "video"], replyWithMediaGroup);

  // TODO: Refactor this proof of concept into menu middleware
  composer.on(["photo", "video", "animation"], (ctx) => {
    const { reply } = ctx.state as ContextState;

    setTimeout(() => {
      reply.forEach((rep) => {
        void ctx.deleteMessage(rep.message_id);
      });
    }, 5000);
  });

  composer.on("message", replyToTextMessage);

  return composer;
}
