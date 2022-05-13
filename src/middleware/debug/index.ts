import { Debugger } from "debug";
import { Composer } from "telegraf";

export function debug(debugFn: Debugger) {
  const composer = new Composer();

  composer.use((ctx, next) => {
    ctx.state.debug = debugFn;

    void next();
  });

  return composer;
}
