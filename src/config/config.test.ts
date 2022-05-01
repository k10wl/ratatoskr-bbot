/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-assignment */
describe("Config should wary depending on NODE_ENV", () => {
  const OLD_ENV = process.env;

  const BOT_TOKEN_MOCKS = {
    PROD_BOT_TOKEN: "prod token",
    DEV_BOT_TOKEN: "dev token",
  };

  process.env.DEV_BOT_TOKEN = BOT_TOKEN_MOCKS.DEV_BOT_TOKEN;
  process.env.PROD_BOT_TOKEN = BOT_TOKEN_MOCKS.PROD_BOT_TOKEN;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("should set PROD_BOT_TOKEN if NODE_ENV is 'PROD'", () => {
    process.env.NODE_ENV = "PROD";

    const CONFIG = require("./index").default;

    expect(CONFIG.BOT_TOKEN).toBe(BOT_TOKEN_MOCKS.PROD_BOT_TOKEN);
  });

  test("should set PROD_BOT_TOKEN if NODE_ENV is not 'PROD'", () => {
    process.env.NODE_ENV = "";

    const CONFIG = require("./index").default;

    expect(CONFIG.BOT_TOKEN).toBe(BOT_TOKEN_MOCKS.DEV_BOT_TOKEN);
  });
});
