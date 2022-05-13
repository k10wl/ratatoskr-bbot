import { Composer } from "telegraf";

import { filterRegisteredUser } from "@src/services";

export function auth() {
  const composer = new Composer();

  composer.on("message", filterRegisteredUser);

  return composer;
}
