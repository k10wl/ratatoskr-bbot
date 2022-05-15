import { CONSOLE_STATEMENTS } from "@src/constants";

import { parseTags } from "./index";

export const tags = `Tag group list

• Test group:
#tag1
#tag2
#tag3
• Test group2:
#tag1
#tag2
#tag3`;

describe("parseTags", () => {
  test("should correctly parse tags", () => {
    expect(parseTags(tags)).toEqual([
      {
        groupName: "Test group",
        originalIndex: 0,
        tags: [{ tag: "#tag1" }, { tag: "#tag2" }, { tag: "#tag3" }],
      },
      {
        groupName: "Test group2",
        originalIndex: 1,
        tags: [{ tag: "#tag1" }, { tag: "#tag2" }, { tag: "#tag3" }],
      },
    ]);
  });

  test("should throw error if tags string is incorrect", () => {
    expect(() => parseTags("tags")).toThrow(
      CONSOLE_STATEMENTS.STRING_PARSE_ERROR
    );
    expect(() => parseTags("• Test group: 1.sadk")).toThrow(
      CONSOLE_STATEMENTS.STRING_PARSE_ERROR
    );
    expect(() => parseTags("#")).toThrow(CONSOLE_STATEMENTS.STRING_PARSE_ERROR);
    expect(() => parseTags("")).toThrow(CONSOLE_STATEMENTS.STRING_PARSE_ERROR);
  });
});
