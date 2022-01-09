module.exports = (ctx) => {
  return {
    chatId: ctx.update.callback_query.message.chat.id,
    messageId: ctx.update.callback_query.message.message_id,
  };
};
