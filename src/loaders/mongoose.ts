import { Debugger } from "debug";
import mongoose from "mongoose";

import config from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";

export async function loadMongoose(debug: Debugger): Promise<void> {
  try {
    await mongoose.connect(config.MONGO_DATABASE_CONNECTION as string);
    debug(CONSOLE_STATEMENTS.MONGOOSE_CONNECTED_SUCCESSFULLY);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.MONGOOSE_CONNECTION_ERROR);
    debug(error);
  }
}
