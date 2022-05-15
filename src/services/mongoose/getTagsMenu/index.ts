import { TagsMenu } from "@src/models";

export async function getTagsMenu() {
  return TagsMenu.find();
}
