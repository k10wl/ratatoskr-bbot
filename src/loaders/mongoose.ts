import { Debugger } from "debug";
import mongoose from "mongoose";

import config from "@src/config";
import { BOT_MESSAGES } from "@src/constants";

export async function loadMongoose(debug: Debugger): Promise<void> {
  try {
    await mongoose.connect(config.MONGO_DATABASE_CONNECTION as string);
    debug(BOT_MESSAGES.MONGOOSE_CONNECTED_SUCCESSFULLY);
  } catch (error) {
    debug(BOT_MESSAGES.MONGOOSE_CONNECTION_ERROR);
    debug(error);
  }
}
