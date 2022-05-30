import debug from "debug";

import CONFIG from "@src/config";
import { TagsUsageStatistic } from "@src/models";

import { TagUsageStatisticT } from "@src/types";

export async function storeUsageStatistics({
  group,
  tag,
}: Omit<TagUsageStatisticT, "dateUsed">) {
  try {
    const newStatistics = new TagsUsageStatistic({
      tag,
      group,
      dateUsed: new Date(),
    });
    await newStatistics.save();

    return newStatistics;
  } catch (error) {
    debug(CONFIG.DEBUG_NAMESPACE)(error);
  }
}
