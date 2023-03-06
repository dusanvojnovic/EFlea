import { randomUUID } from "crypto";
import { Events } from "../../../constants/events";
import {
  messageSubSchema,
  MessageType,
  sendMessageSchema,
} from "../../../schema/message.schema";
import { publicProcedure, router } from "../trpc";
import { observable } from "@trpc/server/observable";

export const roomRouter = router({
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(({ ctx, input }) => {
      const message: MessageType = {
        ...input,
        id: randomUUID(),
        sentAt: new Date(),
        sender: {
          name: ctx.session?.user?.name || "unknown",
        },
      };

      ctx.ee.emit(Events.SEND_MESSAGE, message);
    }),

  onSendMessage: publicProcedure
    .input(messageSubSchema)
    .query(({ ctx, input }) => {
      return observable<MessageType>((emit) => {
        function onMessage(data: MessageType) {
          if (input.roomId === data.roomId) {
            emit.next(data);
          }
        }

        ctx.ee.on(Events.SEND_MESSAGE, onMessage);

        return () => {
          ctx.ee.off(Events.SEND_MESSAGE, onMessage);
        };
      });
    }),
});
