const getReceivedMessagesId = require("./getReceivedMessagesId");
const respondWithMediaFile = require("./respondWithMediaFile");
const respondWithMediaGroup = require("./respondWithMediaGroup");

const messageSendByBot = [];
module.exports.msgMap = messageSendByBot;

module.exports.HandleMessage = class HandleMessage {
  constructor(_ctx) {
    this.ctx = _ctx;
    this.messageKeys = Object.keys(this.ctx.message);
    this.botMediaMessageId = [];
    this.messageInfo = null;
  }

  async init() {
    const message = await getReceivedMessagesId(this.ctx);
    if (!message) {
      return;
    }
    this.messageInfo = message;
  }

  async respondWithMedia() {
    return respondWithMediaFile(this.ctx);
  }

  respondWithMediaGroup() {
    return respondWithMediaGroup(this.ctx);
  }

  // eslint-disable-next-line consistent-return
  async respondToUser() {
    this.storeBotMediaMessageId();
    if (this.messageKeys.includes("media_group_id")) {
      return this.respondWithMediaGroup();
    }
    if (!this.messageKeys.includes("media_group_id")) {
      return this.respondWithMedia();
    }
  }

  async removeUserMessage() {
    if (!this.messageInfo) {
      return;
    }
    this.messageInfo.messages.forEach((messageId) => {
      this.ctx.deleteMessage(messageId);
    });
  }

  storeBotMediaMessageId() {
    if (!this.messageInfo) {
      return;
    }
    const lastReceivedMessage =
      this.messageInfo.messages[this.messageInfo.messages.length - 1];
    for (let i = 0; i < this.messageInfo.messages.length; i += 1) {
      this.botMediaMessageId.push(lastReceivedMessage + i + 1);
    }
  }
};
