const { Markup } = require("telegraf");

const createButtonRow = (row) => {
  if (row.text) {
    return [row];
  }
  return row;
};

// eslint-disable-next-line camelcase
const createInlineKeyboard = (...keyboard_buttons) => {
  const keyboardButtons = keyboard_buttons.map((button) =>
    createButtonRow(button)
  );
  return Markup.inlineKeyboard(keyboardButtons);
};

// eslint-disable-next-line camelcase
const createButtonObject = (text, callback_data, hide = false) => {
  return { text, callback_data, hide };
};

const createSubmenuButtons = (submenus) => {
  const submenusArray = [...submenus];
  return submenusArray.map((submenu) => {
    return createButtonObject(submenu.body, submenu.action);
  });
};

const menuLike = (body, submenus, buttons) => {
  return [
    body,
    createInlineKeyboard(...createSubmenuButtons(submenus), ...buttons),
  ];
};

module.exports = menuLike;
