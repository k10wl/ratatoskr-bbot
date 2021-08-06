/* eslint-disable no-console */
const { Telegraf } = require("telegraf");
const express = require("express");
const MenuMiddleware = require("./src/Menu/MenuMiddleware");
const MenuTemplate = require("./src/Menu/MenuTemplate");
const createTagsMenu = require("./src/tagsManagement/createTagsMenu");
const createSelectedTagsMenu = require("./src/tagsManagement/creteSelectedTagsMenu");
const selectedTagsMap = require("./src/tagsManagement/selectedTags");
const tags = require("./src/tagList");
const { addTagsToMessage } = require("./src/actionHive");
const { HandleMessage } = require("./src/HandleMessage");
const CONFIG = require("./src/config");

const expressApp = express();

const bot = new Telegraf(CONFIG.BOT_API_TOKEN);
bot.telegram
  .setWebhook(`${CONFIG.URL}/bot${CONFIG.BOT_API_TOKEN}`)
  .catch((e) => console.log(e));
expressApp.use(bot.webhookCallback(`/bot${CONFIG.BOT_API_TOKEN}`));

bot.launch().then(() => console.log("\nBot: Ready to work\n"));

const mainMenu = new MenuTemplate("Что ты хочешь передать?");
const tagsList = new MenuTemplate("Теги");
const selectedTags = new MenuTemplate("Выбраные теги");

mainMenu.subMenu("Речь идёт о таком...", "tagList", tagsList);
tagsList.addRowOfButtons(
  { text: "Вернёмся назад", action: "back" },
  { text: "Сохранить пост", action: "save" }
);
mainMenu.subMenu("Мы выбрали...", "selectedTags", selectedTags);
mainMenu.addRowOfButtons(
  { text: "Отменить", action: "cancel" },
  { text: "Сохранить пост", action: "save" }
);
createTagsMenu(bot, tagsList, tags);
createSelectedTagsMenu(bot, selectedTags);

const menuMiddleware = new MenuMiddleware("/", mainMenu);
menuMiddleware.init(bot);

bot.command("menu", (ctx) => mainMenu.replyWithMenu(ctx));

const botMessage = new Map();

bot.action("save", (ctx) => {
  const chatId = ctx.update.callback_query.message.chat.id;
  const messageId = ctx.update.callback_query.message.message_id;
  const mediaIdArray = botMessage.get(chatId).get(messageId);
  if (mediaIdArray.slice(0, -1).length === 1) {
    ctx.telegram
      .copyMessage(CONFIG.TELEGRAM_CHANNEL, chatId, messageId - 1)
      .catch((e) => console.log(e));
  } else {
    const mediaArray = mediaIdArray.slice(-1);
    mediaArray[0][0].caption = [
      ...selectedTagsMap.relativeMessageSet(ctx),
    ].join("\n");
    ctx.telegram
      .sendMediaGroup(CONFIG.TELEGRAM_CHANNEL, ...mediaArray)
      .catch((e) => console.log(e));
  }
  ctx.deleteMessage();
  botMessage.get(chatId).delete(messageId);
  if (selectedTagsMap.map.get(chatId)?.get(messageId)) {
    selectedTagsMap.map.get(chatId).delete(messageId);
  }
  ctx.answerCbQuery("Пост отправлен");
});

bot.action("cancel", (ctx) => {
  const chatId = ctx.update.callback_query.message.chat.id;
  const messageId = ctx.update.callback_query.message.message_id;
  botMessage
    .get(chatId)
    .get(messageId)
    .forEach((id) => typeof id === "number" && ctx.deleteMessage(id));
  ctx.deleteMessage();
  botMessage.get(chatId).delete(messageId);
  if (selectedTagsMap.map.get(chatId)?.get(messageId)) {
    selectedTagsMap.map.get(chatId).delete(messageId);
  }
  ctx.answerCbQuery("Пост отменён");
});

bot.on("message", (ctx, next) => {
  if (!CONFIG.TELEGRAM_ADMIN_ID.includes(ctx.update.message.from.id)) {
    return ctx.reply("I dont know you.");
  }
  return next();
});

bot.on("message", (ctx, next) => {
  const message = new HandleMessage(ctx);
  message
    .init()
    .then(() => message.respondToUser())
    .then((response) => {
      if (response) {
        const userId = ctx.update.message.from.id;
        const menuMessageId = message.botMediaMessageId.slice().pop() + 1;
        if (!botMessage.get(userId)) {
          botMessage.set(userId, new Map());
        }
        const userSet = botMessage.get(userId);
        if (!userSet.get(menuMessageId)) {
          userSet.set(menuMessageId, []);
        }
        const relatedMessages = userSet.get(menuMessageId);
        relatedMessages.push(...message.botMediaMessageId, response);
        const selectionAction = new RegExp(
          `tagWasSelected/${userId}/${menuMessageId}`
        );
        addTagsToMessage(bot, selectionAction, message.botMediaMessageId);
        mainMenu.replyWithMenu(ctx);
      }
    })
    .then(() => message.removeUserMessage())
    .then(() => next());
});

// Removes messages due to timeout
// eslint-disable-next-line consistent-return
bot.on("message", (ctx) => {
  const chatId = ctx.update.message.chat.id;
  let messageId = ctx.update.message.message_id;
  const maxIteration = messageId + 12;
  const message = botMessage.get(chatId);
  if (!message) {
    return null;
  }
  for (messageId; messageId < maxIteration; messageId += 1) {
    if (message.get(messageId)) {
      break;
    }
  }
  if (!message.get(messageId)) {
    return null;
  }
  const idArray = message.get(messageId).slice(0, -1);
  setTimeout(() => {
    botMessage.get(chatId).delete(messageId);
    if (selectedTagsMap.map.get(chatId)?.get(messageId)) {
      selectedTagsMap.map.get(chatId).delete(messageId);
    }
    idArray.forEach((id) => ctx.deleteMessage(id).catch(() => {}));
    ctx.deleteMessage(messageId).catch(() => {});
  }, 900000);
});

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});
expressApp.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
