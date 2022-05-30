import { getCurrentTagsSet } from "./index";

test("getCurrentTagsSet, should return correct tags set", () => {
  getCurrentTagsSet(1, { message_id: 2 } as never).tags.add("RATATOSKR");
  expect(getCurrentTagsSet(1, { message_id: 2 } as never).tags).toEqual(
    new Set(["RATATOSKR"])
  );

  getCurrentTagsSet(22, { message_id: 22 } as never).tags.add("Tags");
  expect(getCurrentTagsSet(22, { message_id: 22 } as never).tags).toEqual(
    new Set(["Tags"])
  );

  getCurrentTagsSet(4, { message_id: 22 } as never);
  expect(getCurrentTagsSet(4, { message_id: 22 } as never).tags).toEqual(
    new Set()
  );
});

test("getCurrentTagsSet, should not return missing set", () => {
  expect(getCurrentTagsSet(23, { message_id: 22 } as never).tags).not.toEqual(
    new Set(["Random value"])
  );
});
