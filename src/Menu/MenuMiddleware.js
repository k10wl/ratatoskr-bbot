const { Composer } = require("telegraf");
const menuLike = require("./menuLike");

class MenuMiddleware {
  constructor(rootTrigger, rootMenu) {
    this.rootTrigger = rootTrigger;
    this.rootMenu = rootMenu;
  }

  init(bot) {
    const actions = [...this.createSubmenuActions(this.rootMenu)];
    return actions.forEach((action) => bot.use(action));
  }

  createSubmenuActions(rootMenu) {
    const actionSet = new Set([
      Composer.action(this.rootTrigger, (ctx, next) => {
        ctx.answerCbQuery();
        ctx.editMessageText(
          ...menuLike(rootMenu.body, rootMenu.submenus, rootMenu.buttons)
        );
        return next();
      }),
    ]);

    const actions = (menu, parentAction = this.rootTrigger) =>
      [...menu.submenus].map((submenu) => {
        const configureBackButton = (buttons) =>
          buttons.map((button) => {
            if (Array.isArray(button)) {
              configureBackButton(button);
            } else if (button.callback_data === "back") {
              // eslint-disable-next-line no-param-reassign
              button.callback_data = parentAction;
            }
            return button;
          });
        const configuredButtons = configureBackButton([
          ...submenu.menu.buttons,
        ]);
        if (submenu.menu.submenus.size !== 0) {
          actions(submenu.menu, submenu.action);
        }
        return actionSet.add(
          Composer.action(submenu.action, (ctx, next) => {
            ctx.editMessageText(
              ...menuLike(
                submenu.body,
                submenu.menu.submenus,
                configuredButtons
              )
            );
            ctx.answerCbQuery();
            return next();
          })
        );
      });

    actions(rootMenu);
    return [...actionSet];
  }
}

module.exports = MenuMiddleware;
