import { model, Schema } from "mongoose";

import { TagUsageStatisticT } from "@src/types";

const tagsUsageStatisticSchema = new Schema<TagUsageStatisticT>({
  tag: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  dateUsed: { type: Date, required: true },
});

export const TagsUsageStatistic = model(
  "tags_usage_statistic",
  tagsUsageStatisticSchema
);
