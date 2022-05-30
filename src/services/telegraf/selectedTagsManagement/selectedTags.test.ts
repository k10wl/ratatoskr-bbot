import { getCurrentTagsSet } from "./index";

test("getCurrentTagsSet, should return correct tags set", () => {
  getCurrentTagsSet({
    userId: 1,
    message: {
      message_id: 2,
    } as never,
  }).tags.add("RATATOSKR");
  expect(
    getCurrentTagsSet({
      userId: 1,
      message: {
        message_id: 2,
      } as never,
    }).tags
  ).toEqual(new Set(["RATATOSKR"]));

  getCurrentTagsSet({
    userId: 22,
    message: {
      message_id: 22,
    } as never,
  }).tags.add("Tags");
  expect(
    getCurrentTagsSet({
      userId: 22,
      message: {
        message_id: 22,
      } as never,
    }).tags
  ).toEqual(new Set(["Tags"]));

  getCurrentTagsSet({
    userId: 4,
    message: {
      message_id: 22,
    } as never,
  });
  expect(
    getCurrentTagsSet({
      userId: 4,
      message: {
        message_id: 22,
      } as never,
    }).tags
  ).toEqual(new Set());
});

test("getCurrentTagsSet, should not return missing set", () => {
  expect(
    getCurrentTagsSet({
      userId: 23,
      message: {
        message_id: 22,
      } as never,
    }).tags
  ).not.toEqual(new Set(["Random value"]));
});
