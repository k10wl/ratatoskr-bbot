import { model, Schema } from "mongoose";

import { RegisteredUserT } from "@src/types";

const registeredUserSchema = new Schema<RegisteredUserT>({
  telegram_user_id: {
    type: String,
    required: true,
  },
});

export const RegisteredUser = model("Registered_user", registeredUserSchema);
