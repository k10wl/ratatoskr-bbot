const map = new Map();

// eslint-disable-next-line consistent-return
module.exports = async function getReceivedMessagesId(ctx, timeout = 100) {
  const message = ctx.message || ctx.channelPost;
  if (!map.get(message.chat.id)) {
    map.set(message.chat.id, new Map());
  }
  const userMap = map.get(message.chat.id);
  if (!userMap.get(message.date)) {
    userMap.set(message.date, {
      resolve: () => {},
      messages: [message.message_id],
    });
  }

  const messagesWithSameDate = userMap.get(message.date);
  const messageIdArray = messagesWithSameDate.messages;
  if (!messageIdArray.includes(message.message_id)) {
    messageIdArray.push(message.message_id);
  }
  userMap.get(message.date).resolve(false);

  const clearMessageCount = new Promise((resolve) => {
    messagesWithSameDate.resolve = resolve;
    setTimeout(() => resolve(true), timeout);
  });
  if ((await clearMessageCount) === true) {
    const userId = message.chat.id;
    const receivedMessagesId = {
      user: userId,
      messages: messageIdArray,
    };
    map.clear();
    return receivedMessagesId;
  }
};
