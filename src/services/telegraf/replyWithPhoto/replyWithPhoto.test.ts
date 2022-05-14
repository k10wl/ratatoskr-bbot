import { replyWithPhoto } from "./index";

const mockReplyWithPhotoSpy = jest.fn();

const mockedReplyObject = {
  chat: {
    id: 1,
  },
  message_id: 2,
};

const mockReplyWithPhoto = (args: never) => {
  mockReplyWithPhotoSpy(args);

  return mockedReplyObject;
};

const mockDelete = jest.fn();
const mockNext = jest.fn();
const mockReplyWithChatAction = jest.fn();

const LAST_FILE_ID = "third";

const mockContext = {
  message: {
    message_id: 1,
    photo: [
      { file_id: "first" },
      { file_id: "second" },
      { file_id: LAST_FILE_ID },
    ],
  },
  replyWithPhoto: mockReplyWithPhoto,
  deleteMessage: mockDelete,
  replyWithChatAction: mockReplyWithChatAction,

  state: {},
};

describe("replyWithPhoto", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    Object.setPrototypeOf(mockContext.state, {});
  });

  test("should only call next if media_group_id exists", async () => {
    await replyWithPhoto(
      {
        ...mockContext,
        message: { ...mockContext.message, media_group_id: "MOCK" },
      } as never,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockDelete).not.toBeCalled();
    expect(mockReplyWithPhotoSpy).not.toBeCalled();
    expect(mockContext.state).toEqual({});
  });

  test(
    "should call replyWithChatAction, reply, delete, populate state " +
      "and next once if media_group_id does not exist",
    async () => {
      await replyWithPhoto(mockContext as never, mockNext);

      expect(mockReplyWithChatAction).toBeCalledTimes(1);
      expect(mockReplyWithChatAction).toHaveBeenCalledWith("upload_photo");

      expect(mockDelete).toBeCalledTimes(1);
      expect(mockDelete).toBeCalledWith(mockContext.message.message_id);

      expect(mockReplyWithPhotoSpy).toBeCalledTimes(1);
      expect(mockReplyWithPhotoSpy).toBeCalledWith(LAST_FILE_ID);

      expect(mockNext).toBeCalledTimes(1);

      expect(mockContext.state).toEqual({ reply: [mockedReplyObject] });
    }
  );
});
