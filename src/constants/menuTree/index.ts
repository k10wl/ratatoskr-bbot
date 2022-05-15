import { ButtonsT } from "@src/utils";

type MenuInstanceT = {
  title: string;
  structure: ButtonsT;
  path: string;
};

export const MAIN_MENU: MenuInstanceT = {
  title: "What do you want me to send?",
  structure: [
    { text: "Lets look at tag groups.", callback: "root/tag_groups" },
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

export const TAG_GROUPS: MenuInstanceT = {
  title: "Tag groups.",
  structure: [
    [
      { text: "Main menu.", callback: "root" },
      { text: "Send post.", callback: "send_post" },
    ],
  ],
  path: "root/tag_groups",
};

export const ONE_GROUP_FOOTER_BUTTONS: ButtonsT = [
  [
    { text: "Back.", callback: "root/tag_groups" },
    { text: "Send post.", callback: "send_post" },
  ],
];
