import { Debugger } from "debug";
import mongoose from "mongoose";

import config from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";

export async function loadMongoose(debug: Debugger): Promise<void> {
  try {
    await mongoose.connect(config.MONGO_DATABASE_CONNECTION as string);
    debug(CONSOLE_STATEMENTS.MONGOOSE.CONNECTION.SUCCESS);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.MONGOOSE.CONNECTION.ERROR);
    debug(error);
  }
}
