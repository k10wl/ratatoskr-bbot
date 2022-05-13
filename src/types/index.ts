import { Debugger } from "debug";
import { Message } from "telegraf/typings/core/types/typegram";

export type RegisteredUserT = {
  telegram_user_id: string;
};

export type ContextState = {
  debug: Debugger;
  reply: Message[];
};
