import i18n from "i18n";
import { Context } from "telegraf";
import { Update, User } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";
import * as services from "@src/services";

import { addUserToState } from "./index";

jest.mock("@src/services");
const mockedService = services as jest.Mocked<typeof services>;

const mockTgReply = jest.fn();
const mockTgNext = jest.fn();

const mockTgContext = {
  reply: mockTgReply,
  state: {},
} as unknown as Context<Update>;

const mockUser: User = {
  id: 1234567890,
  first_name: "Test name",
  is_bot: false,
};

describe("addUserToState", () => {
  beforeEach(() => {
    Object.setPrototypeOf(mockTgContext.state, {});
  });

  test("should reply with rejection message and stop interaction if 'from' is undefined", async () => {
    await addUserToState(mockTgContext, mockTgNext);

    expect(mockTgNext).not.toBeCalled();
    expect(mockTgReply).toBeCalledWith(
      i18n.__(BOT_MESSAGES.CANT_INTERACT_MESSAGE)
    );
  });

  test("should populate state with unregistered user and call next if message is from user", async () => {
    mockedService.findOneRegisteredUserById = jest.fn().mockResolvedValue(null);

    await addUserToState(
      { ...mockTgContext, from: { ...mockUser } } as never,
      mockTgNext
    );

    expect(mockTgContext.state.user).toEqual({
      ...mockUser,
      isRegistered: false,
    });
    expect(mockTgNext).toBeCalled();
    expect(mockTgReply).not.toBeCalledWith();
  });

  test("should populate state with registered user and call next if message is from user", async () => {
    mockedService.findOneRegisteredUserById = jest
      .fn()
      .mockResolvedValue({ telegram_user_id: 1234567890 });

    await addUserToState(
      { ...mockTgContext, from: { ...mockUser } } as never,
      mockTgNext
    );

    expect(mockTgContext.state.user).toEqual({
      ...mockUser,
      isRegistered: true,
    });
    expect(mockTgNext).toBeCalled();
    expect(mockTgReply).not.toBeCalledWith();
  });
});
