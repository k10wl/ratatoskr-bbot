import { createMediaGroup } from "./createMediaGroup";
import { replyWithMediaGroup } from "./index";

jest.mock("./createMediaGroup", () => {
  return { createMediaGroup: jest.fn() };
});

const mockNext = jest.fn();
const mockReplyWithChatAction = jest.fn();
const mockReplyWithMediaGroup = jest.fn();
const mockDeleteMessage = jest.fn();

const mockReplyWithMediaGroupFn = (args: never) => {
  mockReplyWithMediaGroup(args);

  return args;
};

const mockContext = {
  message: { message_id: 111, media_group_id: 222 },
  replyWithChatAction: mockReplyWithChatAction,
  replyWithMediaGroup: mockReplyWithMediaGroupFn,
  deleteMessage: mockDeleteMessage,
  state: {},
};

describe("replyWithMediaGroup", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should only call next once if media_group_id is missing", async () => {
    await replyWithMediaGroup(
      {
        ...mockContext,
        message: { ...mockContext.message, media_group_id: undefined },
      } as never,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReplyWithChatAction).not.toBeCalled();
    expect(mockReplyWithMediaGroup).not.toBeCalled();
    expect(mockDeleteMessage).not.toBeCalled();
  });

  test("should only call replyWithChatAction if creatingMediaGroup is true", async () => {
    (
      createMediaGroup as jest.MockedFunction<typeof createMediaGroup>
    ).mockResolvedValueOnce({
      originalMediaGroup: [],
      newMediaGroup: [],
      creatingMediaGroup: true,
    } as never);

    await replyWithMediaGroup(mockContext as never, mockNext);

    expect(mockReplyWithChatAction).toBeCalledWith("upload_photo");

    expect(mockNext).not.toBeCalled();
    expect(mockReplyWithMediaGroup).not.toBeCalled();
    expect(mockDeleteMessage).not.toBeCalled();
  });

  test(
    "should only call replyWithChatAction if creatingMediaGroup is true" +
      " and newMediaGroup includes more than 1 element",
    async () => {
      (
        createMediaGroup as jest.MockedFunction<typeof createMediaGroup>
      ).mockResolvedValueOnce({
        originalMediaGroup: [],
        newMediaGroup: [1, 2],
        creatingMediaGroup: true,
      } as never);

      await replyWithMediaGroup(mockContext as never, mockNext);

      expect(mockReplyWithChatAction).toBeCalledWith("upload_photo");

      expect(mockNext).not.toBeCalled();
      expect(mockReplyWithMediaGroup).not.toBeCalled();
      expect(mockDeleteMessage).not.toBeCalled();
    }
  );

  test("should only call replyWithChatAction if newMediaGroup includes 1 element", async () => {
    (
      createMediaGroup as jest.MockedFunction<typeof createMediaGroup>
    ).mockResolvedValueOnce({
      originalMediaGroup: [],
      newMediaGroup: [1],
      creatingMediaGroup: false,
    } as never);

    await replyWithMediaGroup(mockContext as never, mockNext);

    expect(mockReplyWithChatAction).toBeCalledWith("upload_photo");

    expect(mockNext).not.toBeCalled();
    expect(mockReplyWithMediaGroup).not.toBeCalled();
    expect(mockDeleteMessage).not.toBeCalled();
  });

  test("should only call replyWithChatAction if newMediaGroup includes 0 elements", async () => {
    (
      createMediaGroup as jest.MockedFunction<typeof createMediaGroup>
    ).mockResolvedValueOnce({
      originalMediaGroup: [],
      newMediaGroup: [],
      creatingMediaGroup: false,
    } as never);

    await replyWithMediaGroup(mockContext as never, mockNext);

    expect(mockReplyWithChatAction).toBeCalledWith("upload_photo");

    expect(mockNext).not.toBeCalled();
    expect(mockReplyWithMediaGroup).not.toBeCalled();
    expect(mockDeleteMessage).not.toBeCalled();
  });

  test(
    "should reply with new media group, populate state reply " +
      "and remove each element of originalMediaGroup " +
      "if creatingMediaGroup is false and newMediaGroup includes more than 1 element",

    async () => {
      const completedCreation = {
        originalMediaGroup: [{ message_id: 8 }, { message_id: 9 }],
        newMediaGroup: [1, 2],
        creatingMediaGroup: false,
      };

      (
        createMediaGroup as jest.MockedFunction<typeof createMediaGroup>
      ).mockResolvedValueOnce(completedCreation as never);

      await replyWithMediaGroup(mockContext as never, mockNext);

      expect(mockNext).toBeCalledTimes(1);
      expect(mockReplyWithMediaGroup).toBeCalledWith(
        completedCreation.newMediaGroup
      );

      expect(mockDeleteMessage).toHaveBeenNthCalledWith(
        1,
        completedCreation.originalMediaGroup[0].message_id
      );
      expect(mockDeleteMessage).toHaveBeenNthCalledWith(
        2,
        completedCreation.originalMediaGroup[1].message_id
      );

      expect(mockDeleteMessage).toHaveBeenCalledTimes(
        completedCreation.originalMediaGroup.length
      );

      expect(mockContext.state).toEqual({
        reply: completedCreation.newMediaGroup,
      });

      expect(mockReplyWithChatAction).not.toBeCalled();
    }
  );
});
