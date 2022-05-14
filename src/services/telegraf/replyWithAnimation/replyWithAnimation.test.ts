import { replyWithAnimation } from "./index";

const mockReplyWithAnimationSpy = jest.fn();

const mockedReplyObject = {
  chat: {
    id: 1,
  },
  message_id: 2,
};

const mockReplyWithAnimation = (args: never) => {
  mockReplyWithAnimationSpy(args);

  return mockedReplyObject;
};

const mockDelete = jest.fn();
const mockNext = jest.fn();
const mockReplyWithChatAction = jest.fn();

const mockContext = {
  message: {
    message_id: 1,
    animation: {
      file_id: "TEST_ANIMATION_FILE_ID",
    },
  },
  replyWithAnimation: mockReplyWithAnimation,
  deleteMessage: mockDelete,
  replyWithChatAction: mockReplyWithChatAction,

  state: {},
};

describe("replyWithAnimation", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    Object.setPrototypeOf(mockContext.state, {});
  });

  test("should only call next if media_group_id exists", async () => {
    await replyWithAnimation(
      {
        ...mockContext,
        message: { ...mockContext.message, media_group_id: "MOCK" },
      } as never,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockDelete).not.toBeCalled();
    expect(mockReplyWithAnimationSpy).not.toBeCalled();
    expect(mockContext.state).toEqual({});
  });

  test(
    "should call replyWithChatAction, reply, delete, populate state " +
      "and next once if media_group_id does not exist",
    async () => {
      await replyWithAnimation(mockContext as never, mockNext);

      expect(mockReplyWithChatAction).toBeCalledTimes(1);
      expect(mockReplyWithChatAction).toHaveBeenCalledWith("upload_document");

      expect(mockDelete).toBeCalledTimes(1);
      expect(mockDelete).toBeCalledWith(mockContext.message.message_id);

      expect(mockReplyWithAnimationSpy).toBeCalledTimes(1);
      expect(mockReplyWithAnimationSpy).toBeCalledWith(
        mockContext.message.animation.file_id
      );

      expect(mockNext).toBeCalledTimes(1);

      expect(mockContext.state).toEqual({ reply: [mockedReplyObject] });
    }
  );
});
