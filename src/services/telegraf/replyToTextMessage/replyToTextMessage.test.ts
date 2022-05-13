import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

import { BOT_MESSAGES } from "@src/constants";

import { replyToTextMessage } from "./index";

const mockReplySpy = jest.fn();

const mockReply = () => {
  mockReplySpy();

  return {
    chat: {
      id: 1,
    },
    message_id: 2,
  };
};

const mockDelete = jest.fn();
const mockNext = jest.fn();
const mockEditMessageText = jest.fn();

const mockContext = {
  message: {
    message_id: 1,
  },
  reply: mockReply,
  deleteMessage: mockDelete,
  telegram: {
    editMessageText: mockEditMessageText,
    deleteMessage: mockDelete,
  },
};

const initialMessage = {};

describe("replyToTextMessage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Object.setPrototypeOf(mockContext.message, initialMessage);
  });

  test("should call reply, edit and delete if message is plain text", async () => {
    await replyToTextMessage(
      mockContext as unknown as NarrowedContext<Context, MountMap["message"]>,
      mockNext
    );

    jest.runAllTimers();

    expect(mockNext).not.toBeCalled();
    expect(mockReplySpy).toBeCalled();
    expect(mockEditMessageText).toBeCalledTimes(
      BOT_MESSAGES.TEXT_REACTION.COUNTDOWN_SECONDS
    );
    expect(mockDelete).toHaveBeenNthCalledWith(1, 1);
    expect(mockDelete).toHaveBeenNthCalledWith(2, 2);
    expect(mockDelete).toBeCalledTimes(2);
  });

  const testShouldCallNext = async (
    key: "text" | "photo" | "video" | "animation",
    value: string
  ) => {
    Object.setPrototypeOf(mockContext.message, { [key]: value });

    await replyToTextMessage(
      mockContext as unknown as NarrowedContext<Context, MountMap["message"]>,
      mockNext
    );

    jest.runAllTimers();

    expect(mockNext).toBeCalled();
    expect(mockDelete).not.toBeCalled();
    expect(mockReplySpy).not.toBeCalled();
    expect(mockEditMessageText).not.toBeCalled();
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
