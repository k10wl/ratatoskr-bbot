import i18n from "i18n";

import { loadI18n } from "@src/loaders/i18n";
import { ButtonsT } from "@src/utils";

type MenuInstanceT = {
  TITLE: string;
  STRUCTURE: ButtonsT;
  PATH: string;
};

// calling loadI18n function here is required to prevent the crash.
loadI18n();

const MENU_ROOT_TITLE = i18n.__("MENU_ROOT_TITLE");
const SELECTED_TAGS_TITLE = i18n.__("SELECTED_TAGS_TITLE");
const NO_TAGS_SELECTED = i18n.__("NO_TAGS_SELECTED");
const CANCEL = i18n.__("CANCEL");
const SEND_POST = i18n.__("SEND_POST");

export const MENU_ROOT: MenuInstanceT = {
  TITLE: MENU_ROOT_TITLE,
  STRUCTURE: [
    { text: SELECTED_TAGS_TITLE, callback: "root/selected" },
    [
      { text: CANCEL, callback: "cancel" },
      { text: SEND_POST, callback: "send_post" },
    ],
  ],
  PATH: "root",
};

export const SELECTED_TAGS: MenuInstanceT & { NO_SELECTED_TAGS: string } = {
  TITLE: SELECTED_TAGS_TITLE,
  NO_SELECTED_TAGS: NO_TAGS_SELECTED,
  STRUCTURE: [
    [
      { text: MENU_ROOT_TITLE, callback: "root" },
      { text: SEND_POST, callback: "send_post" },
    ],
  ],
  PATH: "root/selected",
};

export const ONE_GROUP_FOOTER_BUTTONS: ButtonsT = [
  [
    { text: MENU_ROOT_TITLE, callback: "root" },
    { text: SEND_POST, callback: "send_post" },
  ],
];
