import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BOT_MESSAGES } from "@src/constants";

import {
  checkInteractionPermission,
  HAS_INTERACTION_PERMISSION,
} from "./index";

const mockTgReply = jest.fn();
const mockTgContext = { reply: mockTgReply } as unknown as Context<Update>;
const mockTgNext = jest.fn();

describe("senderCanInteract", () => {
  const middlewareFn = checkInteractionPermission();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should only call 'reply' function with CANT_INTERACT_MESSAGE when 'ctx.from' is not defined", () => {
    void middlewareFn(mockTgContext, mockTgNext);
    expect(mockTgNext).not.toBeCalled();
    expect(mockTgReply).toBeCalledWith(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  });

  test("should only call 'reply' function with CANT_INTERACT_MESSAGE when 'ctx.from' is unacceptable", () => {
    void middlewareFn(
      { ...mockTgContext, from: { id: 0 } } as Context<Update>,
      mockTgNext
    );
    expect(mockTgNext).not.toBeCalled();
    expect(mockTgReply).toBeCalledWith(BOT_MESSAGES.CANT_INTERACT_MESSAGE);
  });

  test("should only call 'next' function when user is acceptable", () => {
    void middlewareFn(
      {
        ...mockTgContext,
        from: { id: HAS_INTERACTION_PERMISSION[0] },
      } as Context<Update>,
      mockTgNext
    );
    expect(mockTgNext).toBeCalled();
    expect(mockTgReply).not.toBeCalled();
  });
});
