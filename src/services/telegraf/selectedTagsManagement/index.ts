import { Message, User } from "telegraf/typings/core/types/typegram";

import { MediaMessageT } from "@src/types";

type GetCurrentTagsSetT = {
  messages: Message[];
  tags: Set<string>;
  mediaGroup: MediaMessageT[];
};

type MessageTagsT = Map<Message["message_id"], GetCurrentTagsSetT>;

type UserMessagesT = Map<User["id"], MessageTagsT>;

const userMessages: UserMessagesT = new Map();

export function getCurrentTagsSet({
  userId,
  message,
  replyMessages,
  mediaGroup,
}: {
  userId: User["id"];
  message: Message;
  replyMessages?: Message[];
  mediaGroup?: MediaMessageT[];
}): GetCurrentTagsSetT {
  if (!userMessages.get(userId)) {
    userMessages.set(userId, new Map());
  }

  const messagesMap = userMessages.get(userId) as MessageTagsT;

  if (!messagesMap.get(message.message_id)) {
    messagesMap.set(message.message_id, {
      mediaGroup: mediaGroup || [],
      messages: replyMessages as Message[],
      tags: new Set(),
    });
  }

  return messagesMap.get(message.message_id)!;
}

export function removeCurrentTagsSet(userId: User["id"], message: Message) {
  if (!userMessages.get(userId)) {
    return;
  }

  const messagesMap = userMessages.get(userId) as MessageTagsT;

  if (!messagesMap.get(message.message_id)) {
    return;
  }

  messagesMap.delete(message.message_id);
}
