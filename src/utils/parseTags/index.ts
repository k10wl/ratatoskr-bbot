import { CONSOLE_STATEMENTS } from "@src/constants";

import { TagsMenuT } from "@src/types";

export function parseTags(tagsString: string) {
  if (!tagsString.includes("• ") || !tagsString.includes("#")) {
    throw new Error(CONSOLE_STATEMENTS.STRING_PARSE_ERROR);
  }

  const [, ...tagsArr] = tagsString.split("• ");

  return tagsArr.map((rawTags, index) => {
    const [groupName, ...list] = rawTags.split(/\n/);
    const obj: TagsMenuT = {
      originalIndex: index,
      groupName: groupName.replace(":", ""),
      tags: list.filter(Boolean).map((tag) => ({ tag })),
    };

    return obj;
  });
}
