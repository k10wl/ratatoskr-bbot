// eslint-disable-next-line consistent-return
module.exports = async (ctx) => {
  const type = Object.keys(ctx.message);
  if (type.includes("photo")) {
    return ctx.replyWithPhoto(ctx.message.photo.pop().file_id);
  }
  if (type.includes("video")) {
    return ctx.replyWithVideo(ctx.message.video.file_id);
  }
  if (type.includes("animation")) {
    return ctx.replyWithAnimation(ctx.message.document.file_id);
  }
};
