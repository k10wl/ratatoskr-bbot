import { ButtonsT } from "@src/utils";

type MenuInstanceT = {
  title: string;
  structure: ButtonsT;
  path: string;
};

export const TAG_GROUPS: MenuInstanceT = {
  title: "Tag groups.",
  structure: [
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
      { text: "Tag groups..", callback: "root" },
      { text: "Send post.", callback: "send_post" },
    ],
  ],
  path: "root/selected",
};

export const ONE_GROUP_FOOTER_BUTTONS: ButtonsT = [
  [
    { text: "Back.", callback: "root" },
    { text: "Send post.", callback: "send_post" },
  ],
];
