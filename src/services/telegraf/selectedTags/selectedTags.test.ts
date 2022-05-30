import { getCurrentMessageMap } from "./index";

test("getCurrentMessageMap, should return correct tags set", () => {
  getCurrentMessageMap(1, { message_id: 2 } as never).tags.add("RATATOSKR");
  expect(getCurrentMessageMap(1, { message_id: 2 } as never).tags).toEqual(
    new Set(["RATATOSKR"])
  );

  getCurrentMessageMap(22, { message_id: 22 } as never).tags.add("Tags");
  expect(getCurrentMessageMap(22, { message_id: 22 } as never).tags).toEqual(
    new Set(["Tags"])
  );

  getCurrentMessageMap(4, { message_id: 22 } as never);
  expect(getCurrentMessageMap(4, { message_id: 22 } as never).tags).toEqual(
    new Set()
  );
});

test("getCurrentMessageMap, should not return missing set", () => {
  expect(
    getCurrentMessageMap(23, { message_id: 22 } as never).tags
  ).not.toEqual(new Set(["Random value"]));
});
