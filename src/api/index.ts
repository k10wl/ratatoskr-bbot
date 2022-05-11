import { Composer } from "telegraf";

import { replyToTextMessage } from "./replyToTextMessage";

export function apiComposer() {
  const composer = new Composer();

  composer.on("message", replyToTextMessage);

  return composer;
}
