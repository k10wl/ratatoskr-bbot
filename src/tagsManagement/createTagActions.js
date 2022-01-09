const { relativeMessageSet, toggleTagsInSelection } = require("./selectedTags");

const createTagActions = (bot, parent, groupAction, tag) => {
  const tagAction = new RegExp(`${tag}$`);
  bot.action(tagAction, (ctx, next) => {
    if (ctx.update.callback_query.data.match(/stmenu/)) {
      return next();
    }
    const messageTags = () => [...relativeMessageSet(ctx)];
    const hasTag = messageTags().includes(tag);
    if (hasTag) {
      ctx.answerCbQuery(`Удалён таг ${tag}`);
    } else {
      ctx.answerCbQuery(`Добавлен таг ${tag}`);
    }
    parent.selection(ctx, toggleTagsInSelection(ctx, tag));
    return next();
  });
};

module.exports = createTagActions;
