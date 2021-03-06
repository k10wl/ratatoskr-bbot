import { Types } from "mongoose";
import {
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  User,
} from "telegraf/typings/core/types/typegram";

export type RegisteredUserT = {
  telegram_user_id: string;
};

export type UserT = User & {
  isRegistered: boolean;
};

export type MediaMessageT = InputMediaPhoto | InputMediaVideo;

export type ContextState = {
  reply: Message[];
  user: UserT;
  newMediaGroup?: MediaMessageT[];
  selectedTag?: {
    name: string;
    group: string;
    action: "ADD" | "REMOVE";
  };
};

export type TagT = {
  tag: string;
  _id?: Types.ObjectId;
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

export type TagUsageStatisticT = {
  group: string;
  tag: string;
  dateUsed: Date;
};
