const selectedTagsMap = new Map();

const filterUser = (map, userId) => {
  if (!map.has(userId)) {
    map.set(userId, new Map());
  }
  return map.get(userId);
};

const filterMessage = (map, userMsg) => {
  if (!map.has(userMsg)) {
    map.set(userMsg, new Set());
  }
  return map.get(userMsg);
};

const relativeMessageSet = (ctx) => {
  if (!ctx.update.callback_query) {
    return;
  }
  const messageId = ctx.update.callback_query.message.message_id;
  const chatId = ctx.update.callback_query.message.chat.id;
  const user = filterUser(selectedTagsMap, chatId);

  // eslint-disable-next-line consistent-return
  return filterMessage(user, messageId);
};

const toggleTagsInSelection = (ctx, tag) => {
  const set = relativeMessageSet(ctx, selectedTagsMap);
  if (set.has(tag)) {
    set.delete(tag);
  } else {
    set.add(tag);
  }
  return set;
};

module.exports.map = selectedTagsMap;
module.exports.toggleTagsInSelection = toggleTagsInSelection;
module.exports.relativeMessageSet = relativeMessageSet;
