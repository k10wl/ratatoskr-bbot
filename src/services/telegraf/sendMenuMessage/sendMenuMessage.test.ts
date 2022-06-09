import { MENU_ROOT } from "@src/constants";
import { getCurrentTagsSet } from "@src/services";

import { sendMenuMessage } from "./index";

jest.mock("@src/services", () => ({
  getTagsMenu: () => [],
  getCurrentTagsSet: jest.fn(),
}));

const mockNext = jest.fn();

const mockReplyWithChatAction = jest.fn();

const mockReply = jest.fn();
const mockReplyFn = (args: never) => {
  mockReply(args);

  return args;
};

const mockContext = {
  state: {},
  from: { id: 1 },
  reply: mockReplyFn,
  replyWithChatAction: mockReplyWithChatAction,
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
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockReply).not.toBeCalled();
  });
  test("should only call next if state reply array is empty", async () => {
    const state = { reply: [] };

    await sendMenuMessage({ ...mockContext, state } as never, mockNext);

    expect(mockNext).toBeCalled();
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockReply).not.toBeCalled();
  });

  test("should only call editMessageText if state reply array is not empty", async () => {
    const state = { reply: [replyMessage] };

    await sendMenuMessage({ ...mockContext, state } as never, mockNext);

    expect(mockReply).toBeCalledWith(MENU_ROOT.TITLE);
    expect(mockReplyWithChatAction).lastCalledWith("upload_photo");
    expect(getCurrentTagsSet).toBeCalledWith({
      userId: mockContext.from.id,
      message: MENU_ROOT.TITLE,
      replyMessages: state.reply,
      mediaGroup: [],
    });

    expect(mockNext).not.toBeCalled();
  });
});
