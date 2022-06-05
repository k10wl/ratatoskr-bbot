import debugLib from "debug";

import CONFIG from "@src/config";

export const debug = debugLib(CONFIG.DEBUG_NAMESPACE);
