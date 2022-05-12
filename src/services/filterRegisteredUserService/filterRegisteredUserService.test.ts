import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import * as services from "@src/services";

import { filterRegisteredUserService } from "./index";

jest.mock("@src/services");
const mockedService = services as jest.Mocked<typeof services>;

const mockTgReply = jest.fn();
const mockTgNext = jest.fn();

const mockTgContext = { reply: mockTgReply } as unknown as Context<Update>;

describe("senderCanInteract", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should reply with rejection message and stop interaction when user is not found.", async () => {
    mockedService.findOneRegisteredUserById = jest.fn().mockResolvedValue(null);

    await filterRegisteredUserService(mockTgContext, mockTgNext);

    expect(mockTgNext).not.toBeCalled();
    expect(mockTgReply).toBeCalledWith(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  });

  test("should proceed interaction without replying when user with given ID is found.", async () => {
    const TEST_ID = 1234567890;

    mockedService.findOneRegisteredUserById = jest
      .fn()
      .mockResolvedValue({ _id: "val", telegraf_user_id: TEST_ID });

    await filterRegisteredUserService(
      { ...mockTgContext, from: { id: TEST_ID } } as Context<Update>,
      mockTgNext
    );

    expect(mockedService.findOneRegisteredUserById).toBeCalledWith(TEST_ID);
    expect(mockTgNext).toBeCalled();
    expect(mockTgReply).not.toBeCalledWith(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  });
});
