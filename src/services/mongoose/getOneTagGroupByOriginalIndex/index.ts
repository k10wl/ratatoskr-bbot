import { TagsMenu } from "@src/models";
import { debug } from "@src/utils";

import { TagsMenuT } from "@src/types";

export const getOneTagGroupByOriginalIndex = async (originalIndex: string) => {
  try {
    if (!originalIndex) {
      return;
    }

    return (await TagsMenu.findOne({ originalIndex })) as TagsMenuT;
  } catch (e) {
    debug(e);
  }
};
