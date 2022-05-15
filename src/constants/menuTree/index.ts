import { ButtonsT } from "@src/utils";

type MenuInstanceT = {
  title: string;
  structure: ButtonsT;
  path: string;
};

export const MAIN_MENU: MenuInstanceT = {
  title: "What do you want me to send?",
  structure: [
    { text: "Lets look at tags.", callback: "root/tags" },
    { text: "Selected tags.", callback: "root/selected" },
    [
      { text: "Cancel.", callback: "cancel" },
      { text: "Send post.", callback: "send_post" },
    ],
  ],
  path: "root",
};

export const SELECTED_TAGS: MenuInstanceT = {
  title: "Selected tags.",
  structure: [
    [
      { text: "Main menu.", callback: "root" },
      { text: "Send post.", callback: "send_post" },
    ],
  ],
  path: "root/selected",
};
