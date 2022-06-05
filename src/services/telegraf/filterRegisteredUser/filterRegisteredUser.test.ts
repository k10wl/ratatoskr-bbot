import i18n from "i18n";
import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";

import { filterRegisteredUser } from "./index";

const mockTgReply = jest.fn();
const mockTgNext = jest.fn();

const mockTgContext = { reply: mockTgReply } as unknown as Context<Update>;

describe("filterRegisteredUser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should reply with rejection message and stop interaction if user is not registered.", async () => {
    await filterRegisteredUser(
      {
        ...mockTgContext,
        state: { user: { isRegistered: false } },
      } as never,
      mockTgNext
    );

    expect(mockTgNext).not.toBeCalled();
    expect(mockTgReply).toBeCalledWith(
      i18n.__(BOT_MESSAGES.CANT_INTERACT_MESSAGE)
    );
  });

  test("should only call next if user is registered.", async () => {
    await filterRegisteredUser(
      {
        ...mockTgContext,
        state: { user: { isRegistered: true } },
      } as never,
      mockTgNext
    );

    expect(mockTgNext).toBeCalled();
    expect(mockTgReply).not.toBeCalledWith(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  });
});
