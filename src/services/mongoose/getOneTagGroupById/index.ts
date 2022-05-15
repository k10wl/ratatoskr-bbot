import { TagsMenu } from "@src/models";

export async function getOneTagGroupById(id: string) {
  return TagsMenu.findById(id);
}
