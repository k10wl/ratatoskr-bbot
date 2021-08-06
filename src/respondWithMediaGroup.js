const mediaGroupMap = new Map();

// eslint-disable-next-line consistent-return
async function createMediaGroup(ctx, timeout = 150) {
  const message = ctx.message || ctx.channelPost;
  if (!mediaGroupMap.get(ctx.chat.id)) {
    mediaGroupMap.set(ctx.chat.id, new Map());
  }
  const userMap = mediaGroupMap.get(ctx.chat.id);
  if (!userMap.get(message.media_group_id)) {
    userMap.set(message.media_group_id, {
      resolve: () => {},
      messages: [],
    });
  }
  const mediaGroupOptions = userMap.get(message.media_group_id);
  mediaGroupOptions.resolve(false);
  mediaGroupOptions.messages.push(message);
  const promise = new Promise((resolve) => {
    mediaGroupOptions.resolve = resolve;
    setTimeout(() => resolve(true), timeout + 50);
  });
  const result = await promise;
  let mediaGroupExport;
  if (result === true) {
    const mediaGroup = mediaGroupOptions.messages
      .slice()
      .sort((a, b) => a.message_id - b.message_id);
    mediaGroupExport = mediaGroup.map((mediaFile) => {
      const type = Object.keys(mediaFile).includes("photo") ? "photo" : "video";
      const media =
        type === "photo"
          ? mediaFile.photo.pop().file_id
          : mediaFile.video.file_id;
      return { type, media };
    });
    userMap.delete(message.media_group_id);
    if (userMap.size === 0) {
      mediaGroupMap.delete(ctx.chat.id);
    }
  }
  if (mediaGroupExport?.length === 1) {
    return undefined;
  }
  if (mediaGroupExport) {
    return mediaGroupExport;
  }
}
// eslint-disable-next-line consistent-return
module.exports = async function respondWithMediaGroup(ctx, map) {
  const mediaGroup = await createMediaGroup(ctx, map);
  const promise = Promise.resolve(mediaGroup).then();
  const result = await promise;
  if (result !== undefined) {
    await ctx.replyWithMediaGroup(result);
    return result;
  }
  return result;
};
