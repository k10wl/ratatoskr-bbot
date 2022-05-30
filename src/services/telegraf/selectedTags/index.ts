import { Message, User } from "telegraf/typings/core/types/typegram";

type GetCurrentMessageMapT = { messages: Message[]; tags: Set<string> };

type MessageTagsT = Map<Message["message_id"], GetCurrentMessageMapT>;

type UserMessagesT = Map<User["id"], MessageTagsT>;

const userMessages: UserMessagesT = new Map();

export function getCurrentMessageMap(
  userId: User["id"],
  message: Message,
  replyMessages?: Message[]
): GetCurrentMessageMapT {
  if (!userMessages.get(userId)) {
    userMessages.set(userId, new Map());
  }

  const messagesMap = userMessages.get(userId) as MessageTagsT;

  if (!messagesMap.get(message.message_id)) {
    messagesMap.set(message.message_id, {
      messages: replyMessages as Message[],
      tags: new Set(),
    });
  }

  return messagesMap.get(message.message_id)!;
}
