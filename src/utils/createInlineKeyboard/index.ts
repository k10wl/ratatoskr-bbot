import { Markup } from "telegraf";

export type ButtonT = {
  text: string;
  callback: string;
};

export type ButtonsT = (ButtonT | ButtonT[])[];

export function createInlineKeyboard(buttons: ButtonsT) {
  const createButton = (button: ButtonT) =>
    Markup.button.callback(button.text, button.callback);

  return Markup.inlineKeyboard(
    buttons.map((button) => {
      if (Array.isArray(button)) {
        return button.map(createButton);
      }

      return [createButton(button)];
    })
  );
}
