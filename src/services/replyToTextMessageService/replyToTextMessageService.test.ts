import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { replyToTextMessageService } from "./index";

const mockReply = jest.fn();
const mockDelete = jest.fn();
const mockNext = jest.fn();
const initialMessage = {};
const mockContext = {
  message: {},
  reply: mockReply,
  deleteMessage: mockDelete,
};

describe("replyToTextMessageService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Object.setPrototypeOf(mockContext.message, initialMessage);
  });

  test("should call delete and reply if message is plain text", async () => {
    await replyToTextMessageService(
      mockContext as unknown as NarrowedContext<Context, MountMap["message"]>,
      mockNext
    );

    expect(mockNext).not.toBeCalled();
    expect(mockDelete).toBeCalled();
    expect(mockReply).toBeCalled();
  });

  const testShouldCallNext = async (
    key: "text" | "photo" | "video" | "animation",
    value: string
  ) => {
    Object.setPrototypeOf(mockContext.message, { [key]: value });

    await replyToTextMessageService(
      mockContext as unknown as NarrowedContext<Context, MountMap["message"]>,
      mockNext
    );

    expect(mockNext).toBeCalled();
    expect(mockDelete).not.toBeCalled();
    expect(mockReply).not.toBeCalled();
  };

  test("should call next if message is a command (starts with /)", async () => {
    await testShouldCallNext("text", "/test");
  });

  test("should only call next if context message contains photo.", async () => {
    await testShouldCallNext("photo", "MOCK");
  });

  test("should only call next if context message contains video.", async () => {
    await testShouldCallNext("video", "MOCK");
  });

  test("should only call next if context message contains animation.", async () => {
    await testShouldCallNext("animation", "MOCK");
  });
});
