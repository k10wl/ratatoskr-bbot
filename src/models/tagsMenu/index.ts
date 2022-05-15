import { model, Schema } from "mongoose";

import { TagsMenuT, TagT } from "@src/types";

const tagSchema = new Schema<TagT>({
  tag: {
    type: String,
    required: true,
  },
});

const tagsMenuSchema = new Schema<TagsMenuT>({
  originalIndex: {
    type: Number,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  tags: [tagSchema],
});

export const TagsMenu = model("tags_menu", tagsMenuSchema);
