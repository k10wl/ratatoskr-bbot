import mongoose from "mongoose";

import CONFIG from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { debug } from "@src/utils";

export async function loadMongoose(): Promise<void> {
  try {
    await mongoose.connect(CONFIG.MONGO_DATABASE_CONNECTION as string, {
      dbName: CONFIG.DB_NAME,
    });
    debug(CONSOLE_STATEMENTS.MONGOOSE.CONNECTION.SUCCESS);
  } catch (error) {
    debug(CONSOLE_STATEMENTS.MONGOOSE.CONNECTION.ERROR);
    debug(error);
  }
}
