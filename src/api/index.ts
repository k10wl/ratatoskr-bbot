import { Composer } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

import {
  replyToTextMessageService,
  replyWithAnimationService,
  replyWithMediaGroupService,
  replyWithPhotoService,
  replyWithVideoService,
} from "@src/services";

export function apiComposer() {
  const composer = new Composer();

  composer.on("photo", replyWithPhotoService);
  composer.on("video", replyWithVideoService);
  composer.on("animation", replyWithAnimationService);

  composer.on(["photo", "video"], replyWithMediaGroupService);

  // TODO: Refactor this proof of concept into menu middleware
  composer.on(["photo", "video", "animation"], (ctx) => {
    const { reply } = ctx.state as {
      reply: Message[];
    };

    setTimeout(() => {
      reply.forEach((rep) => {
        void ctx.deleteMessage(rep.message_id);
      });
    }, 5000);
  });

  composer.on("message", replyToTextMessageService);

  return composer;
}
