const selectedTagsSet = require("./tagsManagement/selectedTags");

const addTagsToMessage = (bot, action, botMediaMessageId) =>
  bot.action(action, (ctx, next) => {
    const data = ctx.update.callback_query.data.split("/");
    const callbackTag = data.slice(0, data.length - 1).pop();
    const [user] = data.filter((route) => route.match(/^[0-9]/));
    const userSelectedTags = [...selectedTagsSet.relativeMessageSet(ctx)];
    if (!data.includes("stmenu")) {
      ctx.telegram
        .editMessageCaption(
          user,
          botMediaMessageId[0],
          botMediaMessageId[0],
          userSelectedTags.join("\n")
        )
        .catch(() => {});
    } else if (userSelectedTags.includes(callbackTag)) {
      const filteredTags = userSelectedTags.filter(
        (tag) => data.slice(0, data.length - 1).pop() !== tag
      );
      const setTags = filteredTags.join("\n");
      ctx.telegram
        .editMessageCaption(
          user,
          botMediaMessageId[0],
          botMediaMessageId[0],
          setTags
        )
        .catch(() => {});
    } else {
      const newTag = [...selectedTagsSet.relativeMessageSet(ctx), callbackTag];
      ctx.telegram
        .editMessageCaption(
          user,
          botMediaMessageId[0],
          botMediaMessageId[0],
          newTag.join("\n")
        )
        .catch(() => {});
    }
    next();
  });

module.exports.addTagsToMessage = addTagsToMessage;
