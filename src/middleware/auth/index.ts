import { Composer } from "telegraf";

import { addUserToState, filterRegisteredUser } from "@src/services";

export function auth() {
  const composer = new Composer();

  composer.on("message", addUserToState, filterRegisteredUser);

  return composer;
}
