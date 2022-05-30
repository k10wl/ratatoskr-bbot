import { TAG_GROUPS } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";

import { sendMenuMessage } from "./index";

jest.mock("@src/services", () => ({
  getTagsMenu: () => [],
  getCurrentTagsSet: jest.fn(),
}));

const mockNext = jest.fn();

const mockReply = jest.fn();
const mockReplyFn = (args: never) => {
  mockReply(args);

  return args;
};

const mockContext = {
  state: {},
  from: { id: 1 },
  reply: mockReplyFn,
};

const replyMessage = {
  chat: { id: 1 },
  message_id: 1,
};
describe("sendMenuMessage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should only call next if state reply does not exist", async () => {
    await sendMenuMessage(mockContext as never, mockNext);

    expect(mockNext).toBeCalled();

    expect(mockReply).not.toBeCalled();
  });
  test("should only call next if state reply array is empty", async () => {
    const state = { reply: [] };

    await sendMenuMessage({ ...mockContext, state } as never, mockNext);

    expect(mockNext).toBeCalled();

    expect(mockReply).not.toBeCalled();
  });

  test("should only call editMessageText if state reply array is not empty", async () => {
    const state = { reply: [replyMessage] };

    await sendMenuMessage({ ...mockContext, state } as never, mockNext);

    expect(mockReply).toBeCalledWith(TAG_GROUPS.title);
    expect(getCurrentTagsSet).toBeCalledWith(
      mockContext.from.id,
      TAG_GROUPS.title,
      state.reply
    );

    expect(mockNext).not.toBeCalled();
  });
});
