const { Telegraf, Markup } = require('telegraf');
const tagList = require('./src/tagList')
const express = require('express');
const expressApp = express();

const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
const TELEGRAM_ADMIN_ID = process.env.TELEGRAM_ADMIN_ID
const API_TOKEN = process.env.API_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://ratatoskr-bbot.herokuapp.com';

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

const config = {
  TOKEN: API_TOKEN,
  redirectTo: TELEGRAM_CHANNEL,
  router: [{
    name: "Путник, что ты хочешь передать?",
    action: "mm",
    children: [
      {
        name: "Уточним теги",
        action: "mmtm",
        children: [
          {
            name: "Речь идёт о таком...",
            action: "mmtmtg",
          },
          {
            name: "Мы выбрали...",
            action: "mmtmst"
          }
        ]
      },
    ],
  }],
  checkedTagMark: " \u{1F330}",
};
let selectedTags = [];

bot.command("about", (ctx) => {
  ctx.reply("Привет, меня зовут Рататоск" + "\n" +
    "Моя задача - помочь тебе выбрать теги и передать пост в нашу группу" + "\n" + "\n" +
    "Чтобы начать скинь мне картинку/видео/гифку")
})
bot.command("slomano", async (ctx) => {
  await ctx.telegram.sendMessage(TELEGRAM_ADMIN_ID, "Плохие вести! Что то сломалось!")
  await ctx.reply("Админ оповещён")
})

const normalizedAction = (route, index) => {
  let action
  if (index < 9) {
    action = route + "00" + index.toString(10)
  } else if (index < 9) {
    action = route + "0" + index.toString(10)
  } else {
    action = route + index.toString(10)
  }
  return action
}

bot.action("cancel", async (ctx) => {
  ctx.answerCbQuery()
  await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
  await ctx.deleteMessage(ctx.update.callback_query.message.message_id - 1);
  selectedTags.splice(0, selectedTags.length);
});

bot.action("apply-tags", (ctx) => {
  try {
    ctx.answerCbQuery()
    ctx.telegram.editMessageCaption(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id - 1,
      undefined,
      selectedTags.filter((tag) => !tag.match("_")).join("\n")
    );
  } catch (err) {console.log(err)}
})

bot.action("post", async (ctx) => {
  ctx.answerCbQuery()
  await ctx.telegram.copyMessage(
    config.redirectTo,
    ctx.update.callback_query.message.chat.id,
    ctx.update.callback_query.message.message_id - 1
  )
  await ctx.editMessageText("Уже бегу передавать!")
  await setTimeout(() => ctx.deleteMessage(), 5000)
})

const createNavigationActions = (location) => {
  return location.map((trigger) => {
    if (trigger.children) {
      createNavigationActions(trigger.children)
    }
    return bot.action(trigger.action, (ctx) => {
      ctx.answerCbQuery()
      ctx.editMessageText(trigger.name, displayMenuNavigation(trigger))
    })
  })
}
createNavigationActions(config.router)

const createSelectedTagsActions = (selectedTagsArray) => {
  const route = "mmtmst"
  return selectedTagsArray.forEach((tag) => {
    const trigger = route + tag
    return bot.action(trigger, (ctx) => {
      ctx.answerCbQuery()
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter((filter) => filter !== tag)
      } else {
        selectedTags.splice(selectedTagsArray.indexOf(tag), 0, tag)
      }
      const tabName = config.router[0].children[0].children[1].name
      ctx.editMessageText(tabName, Markup.inlineKeyboard(
        [...displaySelectedTags(selectedTagsArray), [backButton("mmtmst"), applyTags]]
      ))
    })
  })
}

const createTagGroupActions = (tagArray) => {
  return tagArray.map((group, groupIndex) => {
    const route = "mmtmtg"
    return bot.action(normalizedAction(route, groupIndex), (ctx) => {
      ctx.answerCbQuery()
      ctx.editMessageText(group.name, displayMenuNavigation({action: normalizedAction(route, groupIndex)}))
    })
  })
}
createTagGroupActions(tagList);

const createTagActions = (tagArray) => {
  return tagArray.forEach((group, groupIndex) => {
    return group.groupTags.map((tag, index) => {
      const action = normalizedAction("mmtmtg", groupIndex)
      const trigger = normalizedAction(action, index)
      return bot.action(trigger, (ctx) => {
        ctx.answerCbQuery()
        if (selectedTags.includes(tag)) {
          selectedTags = selectedTags.filter((filter) => tag !== filter)
        } else {
          selectedTags.push(tag)
        }
        ctx.editMessageText(group.name, displayMenuNavigation({ action: action }))
      })
    })
  })
}
createTagActions(tagList);

const backButton = (action) => {
  const num = action.match(/^mmtmtg(...)/) ? -3 : -2
  return Markup.button.callback("Вернёмся назад", action.slice(0, num))
}
const cancel = Markup.button.callback("Ничего, забудь", "cancel")
const post = Markup.button.callback("Передай пост", "post")
const applyTags = Markup.button.callback("Запомни теги", "apply-tags")

const displayMenuNavigation = (location = {children: null, action: null}) => {
  const {children, action} = location
  let normalizedButtons = []
  if (!location.action.match(/^mmtmtg/) && !location.action.match(/^mmtmst/)) {
    if (children) {
      normalizedButtons = children.map((route) => [Markup.button.callback(route.name, route.action)]);
    }
  }
  if (location.action.match(/^mmtmst$/)) {
    createSelectedTagsActions(selectedTags.slice())
    normalizedButtons = displaySelectedTags(selectedTags.slice())
  }
  if (location.action.match(/^mmtmtg$/)) {
    normalizedButtons = displayTagGroupNavigation(location.action)
  }
  if (location.action.match(/^mmtmtg(...)$/)) {
    normalizedButtons = displayTagNavigation(location.action)
  }
  const back = backButton(action)
  const buttons = [...normalizedButtons]
  if (action.length === 2) {
    buttons.push([cancel, post])
  }
  if (action.length > 2) {
    buttons.push([back])
    if (action.match(/mmtm/)) {
      buttons[buttons.length - 1].push(applyTags)
    }
  }
  return Markup.inlineKeyboard(buttons);
}

const displaySelectedTags = (selectedTagsArray) => {
  const route = "mmtmst";
  return selectedTagsArray.map((tag) => {
    let displayTag
    if (selectedTags.includes(tag)) {
      displayTag = tag.concat(config.checkedTagMark)
    } else {
      displayTag = tag
    }
    const action = route + tag
    return [Markup.button.callback(displayTag, action)]
  })
}

const displayTagGroupNavigation = (route) => {
  return tagList.map((groupName, index) => {
    return [Markup.button.callback(groupName.name, normalizedAction(route, index))]
  })
}

const displayTagNavigation = (route) => {
  const groupIndex = route.substr(-3)
  return tagList[parseInt(groupIndex, 10)].groupTags.map((tag, index) => {
    return [Markup.button.callback(
      selectedTags.includes(tag) ? tag + config.checkedTagMark : tag,
      normalizedAction(route, index)
    )]
  })
}

const cancelDueToTimeout = (ctx) => {
  setTimeout(async () => {
    await ctx.deleteMessage(ctx.message.message_id + 1);
    await ctx.deleteMessage(ctx.message.message_id + 2);
    selectedTags.splice(0, selectedTags.length);
  }, 900000)
}

const timeoutsArray = []
const mediaArray = []
bot.on("photo", (ctx) => {
  cancelDueToTimeout(ctx)
  const photoId = ctx.message.photo.pop().file_id
  mediaArray.push(photoId)
  timeoutsArray.push(
    setTimeout(async () => {
      const mediaGroup = mediaArray.map((photoId) => {
        return { type: "photo", media: photoId }
      })
      await ctx.deleteMessage(ctx.message.message_id)
      await ctx.replyWithMediaGroup(mediaGroup)
      await ctx.reply(config.router[0].name, displayMenuNavigation(...config.router))
      mediaArray.splice(0, mediaArray.length)
    }, 1)
  );
  for (let i = 0; timeoutsArray.length - 1 > i; i++) {
    clearTimeout(timeoutsArray[i])
  }
});

bot.on("video", (ctx) => {
  cancelDueToTimeout(ctx)
  const videoId = ctx.message.video.file_id;
  timeoutsArray.push(
    setTimeout(async () => {
      await ctx.deleteMessage(ctx.message.message_id)
      await ctx.replyWithVideo(videoId)
      await ctx.reply(config.router[0].name, displayMenuNavigation(...config.router))
      mediaArray.splice(0, mediaArray.length)
    }, 1)
  )
  for (let i = 0; timeoutsArray.length - 1 > i; i++) {
    clearTimeout(timeoutsArray[i])
  }
})

bot.on("animation", (ctx) => {
  cancelDueToTimeout(ctx)
  const animationId = ctx.message.animation.file_id;
  timeoutsArray.push(
    setTimeout(async () => {
      await ctx.deleteMessage(ctx.message.message_id)
      await ctx.replyWithAnimation(animationId)
      await ctx.reply(config.router[0].name, displayMenuNavigation(...config.router))
      mediaArray.splice(0, mediaArray.length)
    }, 1)
  )
})

bot.on("message", (ctx) => {
  ctx.reply("Я не могу такое передавать" + "\n" +
    "Лучше отправь мне фото/видео/анимацию. Либо скинь мне пост")
})


expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});