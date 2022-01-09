const selectedTags = require("./selectedTags");
const ctxMessageInfo = require("./ctxMessageInfo");

const createSelectedTagsMenu = (bot, parent) => {
  bot.action("selectedTags/", (ctx) => {
    const msgInfo = ctxMessageInfo(ctx);
    const relativeMessages = selectedTags.relativeMessageSet(ctx);
    const action = (tag) =>
      `tagWasSelected/${msgInfo.chatId}/${msgInfo.messageId}/${tag}/stmenu`;
    ctx.answerCbQuery();
    parent.clearButtons(ctx);
    [...relativeMessages].forEach((tag) => {
      parent.addPersonalizedButton(msgInfo, tag, action(tag));
    });
    parent.addPersonalizedButtonRow(
      msgInfo,
      { text: "Вернёмся назад", action: "/" },
      { text: "Сохранить пост", action: "save" }
    );
    [...relativeMessages].forEach((tag) => {
      bot.action(action(tag), (actionCtx, next) => {
        const hasTag = [
          ...selectedTags.map.get(msgInfo.chatId).get(msgInfo.messageId),
        ].includes(tag);
        if (hasTag) {
          actionCtx.answerCbQuery(`Удалён таг ${tag}`);
        } else {
          actionCtx.answerCbQuery(`Добавлен таг ${tag}`);
        }
        selectedTags.toggleTagsInSelection(actionCtx, tag);
        parent.selection(actionCtx, selectedTags.relativeMessageSet(ctx));
        next();
      });
    });
    parent.selection(ctx, selectedTags.relativeMessageSet(ctx));
  });
};

module.exports = createSelectedTagsMenu;
