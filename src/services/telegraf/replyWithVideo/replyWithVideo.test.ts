import { replyWithVideo } from "./index";

const mockReplyWithVideoSpy = jest.fn();

const mockedReplyObject = {
  chat: {
    id: 1,
  },
  message_id: 2,
};

const mockReplyWithVideo = (args: never) => {
  mockReplyWithVideoSpy(args);

  return mockedReplyObject;
};

const mockDelete = jest.fn();
const mockNext = jest.fn();
const mockReplyWithChatAction = jest.fn();

const VIDEO_FILE_ID = "VIDEO_FILE_ID";

const mockContext = {
  message: {
    message_id: 1,
    video: { file_id: VIDEO_FILE_ID },
  },
  replyWithVideo: mockReplyWithVideo,
  deleteMessage: mockDelete,
  replyWithChatAction: mockReplyWithChatAction,

  state: {},
};

describe("replyWithVideo", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    Object.setPrototypeOf(mockContext.state, {});
  });

  test("should only call next if media_group_id exists", async () => {
    await replyWithVideo(
      {
        ...mockContext,
        message: { ...mockContext.message, media_group_id: "MOCK" },
      } as never,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockDelete).not.toBeCalled();
    expect(mockReplyWithVideoSpy).not.toBeCalled();
    expect(mockContext.state).toEqual({});
  });

  test(
    "should call replyWithChatAction, reply, delete, populate state " +
      "and next once if media_group_id does not exist",
    async () => {
      await replyWithVideo(mockContext as never, mockNext);

      expect(mockReplyWithChatAction).toBeCalledTimes(1);
      expect(mockReplyWithChatAction).toHaveBeenCalledWith("upload_video");

      expect(mockDelete).toBeCalledTimes(1);
      expect(mockDelete).toBeCalledWith(mockContext.message.message_id);

      expect(mockReplyWithVideoSpy).toBeCalledTimes(1);
      expect(mockReplyWithVideoSpy).toBeCalledWith(VIDEO_FILE_ID);

      expect(mockNext).toBeCalledTimes(1);

      expect(mockContext.state).toEqual({ reply: [mockedReplyObject] });
    }
  );
});
