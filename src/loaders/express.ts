import express from "express";

import CONFIG from "@src/config";
import { CONSOLE_STATEMENTS } from "@src/constants";
import { debug } from "@src/utils";

export const loadExpress = () => {
  try {
    const server = express();

    const STATUS_ROUTE = "/status_check";

    server.get(STATUS_ROUTE, (req, res) => {
      res.status(200).json({ message: "Ratatoskr is live!", status: 200 });
    });

    server.listen(CONFIG.PORT, () => {
      debug(
        `${CONSOLE_STATEMENTS.EXPRESS.LAUNCH.SUCCESS}${
          CONFIG.URL || "http://localhost"
        }:${CONFIG.PORT}${STATUS_ROUTE}`
      );
    });
  } catch (error) {
    debug(CONSOLE_STATEMENTS.EXPRESS.LAUNCH.ERROR);
    debug(error);
  }
};
