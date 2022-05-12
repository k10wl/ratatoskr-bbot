import { Composer } from "telegraf";

import {
  replyToTextMessageService,
  replyWithMediaGroupService,
} from "@src/services";

export function apiComposer() {
  const composer = new Composer();

  composer.on(["photo", "video"], replyWithMediaGroupService);

  composer.on("message", replyToTextMessageService);

  return composer;
}
