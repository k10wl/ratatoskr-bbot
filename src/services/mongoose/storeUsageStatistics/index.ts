import { TagsUsageStatistic } from "@src/models";
import { debug } from "@src/utils";

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
    debug(error);
  }
}
