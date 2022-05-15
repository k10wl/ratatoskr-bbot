import { TagsMenu } from "@src/models";

export async function dropTagGroups() {
  await TagsMenu.deleteMany({});
}
