const menuLike = require("./menuLike");
const config = require("../config");

class MenuTemplate {
  constructor(name) {
    this.body = name;
    this.submenus = new Set();
    this.buttons = new Set();
    this.personalizedButton = new Map();
    this.selectedTags = new Set();
  }

  subMenu(name = "", action = "", submenu = {}) {
    this.submenus.add({
      body: name,
      action: `${action}/`,
      menu: submenu,
    });
  }

  selection(ctx, selectedButtonsSet = new Set(), chat, msg) {
    const messageId = chat || ctx.update.callback_query.message.message_id;
    const chatId = msg || ctx.update.callback_query.message.chat.id;
    const messageButtons = this.getPersonalizedMessageSet({
      chatId,
      messageId,
    });
    const buttonsCopy = [...messageButtons].map((button) =>
      JSON.parse(JSON.stringify(button))
    );
    buttonsCopy.map((button) => {
      if (selectedButtonsSet.has(button.text)) {
        // eslint-disable-next-line no-param-reassign
        button.text += config.checkedTagMark;
      }
      return button;
    });
    if (buttonsCopy.length === 1) {
      buttonsCopy.push([
        { text: "Теги не выбраны. Перейти к тегам", callback_data: "tagList/" },
      ]);
      buttonsCopy.reverse();
    }
    const updateButtons = menuLike(this.body, this.submenus, buttonsCopy);
    ctx.telegram.editMessageText(
      chatId,
      messageId,
      messageId,
      ...updateButtons
    );
  }

  clearButtons(ctx = null) {
    if (!ctx) {
      this.buttons.clear();
    }
    const chatId = ctx.update.callback_query.message.chat.id;
    const messageId = ctx.update.callback_query.message.message_id;
    const msgInfo = {
      chatId,
      messageId,
    };
    this.getPersonalizedMessageSet(msgInfo).clear();
  }

  addButton(text = "", action = "") {
    this.buttons.add(this.constructor.createButtonObject(text, action));
  }

  addRowOfButtons(...rowButton) {
    const row = rowButton.map((button) =>
      this.constructor.createButtonObject(
        button.text,
        button.action,
        button.hide
      )
    );
    this.buttons.add(row);
  }

  getPersonalizedMessageSet({ chatId, messageId }) {
    if (!this.personalizedButton.get(chatId)) {
      this.personalizedButton.set(chatId, new Map());
    }
    const chat = this.personalizedButton.get(chatId);
    if (!chat.get(messageId)) {
      chat.set(messageId, new Set());
    }
    return chat.get(messageId);
  }

  addPersonalizedButton(msgInfo, text, action) {
    this.getPersonalizedMessageSet(msgInfo).add(
      this.constructor.createButtonObject(text, action)
    );
  }

  addPersonalizedButtonRow(msgInfo, ...rowButton) {
    const row = rowButton.map((button) =>
      this.constructor.createButtonObject(
        button.text,
        button.action,
        button.hide
      )
    );
    this.getPersonalizedMessageSet(msgInfo).add(row);
  }

  backButton(text = "Back") {
    this.buttons.add(this.constructor.createButtonObject(text, "back"));
  }

  // eslint-disable-next-line camelcase
  static createButtonObject(text, callback_data, hide = false) {
    return { text, callback_data, hide };
  }

  replyWithMenu(ctx) {
    return ctx.reply(...menuLike(this.body, this.submenus, this.buttons));
  }
}

module.exports = MenuTemplate;
