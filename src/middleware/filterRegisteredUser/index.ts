import { Composer } from "telegraf";

import { filterRegisteredUserService } from "@src/services";

export function filterRegisteredUser() {
  const composer = new Composer();

  composer.on("message", filterRegisteredUserService);

  return composer;
}
