import { TagsMenu } from "@src/models";

import { TagsMenuT } from "@src/types";

export async function addNewTagGroup(menu: TagsMenuT) {
  const newGroup = new TagsMenu(menu);

  await newGroup.save();

  return newGroup;
}
