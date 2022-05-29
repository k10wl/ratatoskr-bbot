import { Message, User } from "telegraf/typings/core/types/typegram";

type MessageTagsT = Map<
  Message["message_id"],
  { initialMessageId: Message["message_id"]; tags: Set<string> }
>;

type UserMessagesT = Map<User["id"], MessageTagsT>;

const userMessages: UserMessagesT = new Map();

export function getCurrentMessageMap(
  userId: User["id"],
  message: Message,
  initialMessageId: Message["message_id"]
): { initialMessageId: Message["message_id"]; tags: Set<string> } {
  if (!userMessages.get(userId)) {
    userMessages.set(userId, new Map());
  }

  const messagesMap = userMessages.get(userId) as MessageTagsT;

  if (!messagesMap.get(message.message_id)) {
    messagesMap.set(message.message_id, { initialMessageId, tags: new Set() });
  }

  return messagesMap.get(message.message_id)!;
}
