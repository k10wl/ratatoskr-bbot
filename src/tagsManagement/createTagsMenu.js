const MenuTemplate = require("../Menu/MenuTemplate");
const selectedTags = require("./selectedTags");
const createTagActions = require("./createTagActions");
const ctxMessageInfo = require("./ctxMessageInfo");

const createTagsMenu = (bot, parentMenu, tagsDB) => {
  tagsDB.forEach((group, index) => {
    const tagGroup = new MenuTemplate(group.name);
    const groupId = `groupId_${index}`;
    parentMenu.subMenu(group.name, groupId, tagGroup);
    group.groupTags.forEach((tag) => {
      createTagActions(bot, tagGroup, groupId, tag);
    });
    bot.action(`${groupId}/`, (ctx) => {
      ctx.answerCbQuery(`${group.name}`);
      const msgInfo = ctxMessageInfo(ctx);
      const action = (tag) =>
        `tagWasSelected/${msgInfo.chatId}/${msgInfo.messageId}/${tag}`;
      tagGroup.clearButtons(ctx);
      [...group.groupTags].forEach((tag) => {
        tagGroup.addPersonalizedButton(msgInfo, tag, action(tag));
      });
      tagGroup.addPersonalizedButtonRow(
        msgInfo,
        { text: "Вернёмся назад", action: "tagList/" },
        { text: "Сохранить пост", action: "save" }
      );
      tagGroup.selection(ctx, selectedTags.relativeMessageSet(ctx));
    });
  });
};

module.exports = createTagsMenu;
