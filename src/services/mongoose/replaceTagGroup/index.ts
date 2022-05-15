import { TagsMenu } from "@src/models";

import { TagsMenuT } from "@src/types";

export async function replaceTagGroup(menu: TagsMenuT) {
  return TagsMenu.findOneAndReplace({ groupName: menu.groupName }, menu);
}
