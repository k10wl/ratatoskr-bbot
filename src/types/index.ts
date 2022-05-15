import { Debugger } from "debug";
import { Message, User } from "telegraf/typings/core/types/typegram";

export type RegisteredUserT = {
  telegram_user_id: string;
};

export type UserT = User & {
  isRegistered: boolean;
};

export type ContextState = {
  debug: Debugger;
  reply: Message[];
  user: UserT;
};

export type TagT = {
  tag: string;
};

export type TagsMenuT = {
  originalIndex: number;
  groupName: string;
  tags: TagT[];
};

export type GroupInfoT = {
  groupId: number;
  tagsMessageId: number;
};
