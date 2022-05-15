import { Context, NarrowedContext } from "telegraf";
import {
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  Update,
} from "telegraf/typings/core/types/typegram";
import { MountMap } from "telegraf/typings/telegram-types";

type MediaGroupMapT = Map<
  string,
  {
    isLast: (resolver: boolean) => void;
    messages: (Update.New &
      Update.NonChannel &
      (Message.PhotoMessage | Message.VideoMessage))[];
  }
>;

export type ChatsMapT = Map<number, MediaGroupMapT>;

type MediaMessageT = InputMediaPhoto | InputMediaVideo;

type CreateMediaGroupT = Promise<{
  newMediaGroup: MediaMessageT[];
  originalMediaGroup: (Update.New &
    Update.NonChannel &
    (Message.PhotoMessage | Message.VideoMessage))[];
  creatingMediaGroup: boolean;
}>;

const UNFORMED_GROUP = {
  newMediaGroup: [],
  originalMediaGroup: [],
  creatingMediaGroup: false,
};

// 1000ms is safe time for bot to process media messages
const SAFE_TIMEOUT = 1000;

export async function createMediaGroup(
  chatsMap: ChatsMapT,
  ctx: NarrowedContext<Context, MountMap["photo" | "video"]>
): CreateMediaGroupT {
  const message = ctx.message || ctx.channelPost;

  if (!message?.media_group_id) {
    return UNFORMED_GROUP;
  }

  if (!chatsMap.get(ctx.chat.id)) {
    chatsMap.set(ctx.chat.id, new Map());
  }

  const userMediaGroupMap = chatsMap.get(ctx.chat.id);

  if (!userMediaGroupMap) {
    return UNFORMED_GROUP;
  }

  if (!userMediaGroupMap?.get(message.media_group_id)) {
    userMediaGroupMap.set(message.media_group_id, {
      isLast: () => null,
      messages: [],
    });
  }

  const originalMediaGroup = userMediaGroupMap.get(message.media_group_id);

  if (!originalMediaGroup) {
    return UNFORMED_GROUP;
  }

  // This is a workaround for telegram dealing group message as a separate message
  // The following block processes all media messages before giving a result
  originalMediaGroup.isLast(false);
  originalMediaGroup.messages.push(message);
  const resolveTimeout = new Promise((resolve) => {
    originalMediaGroup.isLast = resolve;
    setTimeout(() => resolve(true), SAFE_TIMEOUT);
  });
  const lastMediaGroupItem = await resolveTimeout;

  if (lastMediaGroupItem) {
    const mediaGroupMessages = originalMediaGroup.messages.slice();

    const orderedMediaGroupMessages = mediaGroupMessages.sort(
      (a, b) => a.message_id - b.message_id
    );

    const newMediaGroup: MediaMessageT[] = orderedMediaGroupMessages.map(
      (mediaGroupMessage) => {
        if ("photo" in mediaGroupMessage) {
          return {
            type: "photo",
            media:
              mediaGroupMessage.photo[mediaGroupMessage.photo.length - 1]
                .file_id,
          };
        }

        return {
          type: "video",
          media: mediaGroupMessage.video.file_id,
        };
      }
    );

    userMediaGroupMap.delete(message.media_group_id);

    return {
      newMediaGroup,
      originalMediaGroup: mediaGroupMessages,
      creatingMediaGroup: false,
    };
  }

  return {
    newMediaGroup: [],
    originalMediaGroup: [],
    creatingMediaGroup: true,
  };
}
