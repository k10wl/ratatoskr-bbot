import { model, Schema } from "mongoose";

import { GroupInfoT } from "@src/types";

const groupInfoSchema = new Schema<GroupInfoT>({
  groupId: {
    type: Number,
    required: true,
  },
  tagsMessageId: {
    type: Number,
    required: true,
  },
});

export const GroupInfo = model("group_info", groupInfoSchema);
