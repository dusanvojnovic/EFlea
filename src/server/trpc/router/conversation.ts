import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { conversationPopulated } from "../../../../prisma/helpers";
// import { trpc } from "../../../utils/trpc";
// import {
//   messageSubSchema,
//   MessageType,
//   sendMessageSchema,
// } from "../../../schema/message.schema";
import { TRPCError } from "@trpc/server";
import { Events } from "../../../constants/events";
import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
// import { randomUUID } from "crypto";
import { ConversationType } from "../../../schema/conversation.schema";

import { wss } from "../../wsServer";
import { trpc } from "../../../utils/trpc";
import { MessageType } from "../../../schema/message.schema";
import { Conversation } from "@prisma/client";

// interface MyEvents {
//   CREATE_CONVERSATION: (data: MessageType) => void;
// }

// declare interface MyEventEmitter {
//   on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   emit<TEv extends keyof MyEvents>(
//     event: TEv,
//     ...args: Parameters<MyEvents[TEv]>
//   ): boolean;
// }

// class MyEventEmitter extends EventEmitter {}

// In a real app, you'd probably use Redis or something
// const ee = new MyEventEmitter();

export const conversationRouter = router({
  // sendMessage: protectedProcedure
  //   .input(sendMessageSchema)
  //   .mutation(({ ctx, input }) => {
  //     const message: MessageType = {
  //       ...input,
  //       id: randomUUID(),
  //       sentAt: new Date(),
  //       sender: {
  //         name: ctx.session?.user?.name || "unknown",
  //       },
  //     };

  //     ctx.ee.emit(Events.SEND_MESSAGE, message);
  //   }),

  // onSendMessage: protectedProcedure
  //   .input(messageSubSchema)
  //   .subscription(({ ctx, input }) => {
  //     return observable<MessageType>((emit) => {
  //       function onMessage(data: MessageType) {
  //         if (input.roomId === data.roomId) {
  //           emit.next(data);
  //         }
  //       }

  //       ctx.ee.on(Events.SEND_MESSAGE, onMessage);

  //       return () => {
  //         ctx.ee.off(Events.SEND_MESSAGE, onMessage);
  //       };
  //     });
  //   }),

  createConversation: protectedProcedure
    .input(z.object({ participantsIds: z.string().array().length(2) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { participantsIds } = input;
        const userId = ctx.session?.user?.id;

        const conversation = await ctx.prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          // include: conversationPopulated,
        });

        ctx.ee.emit("CREATE_CONVERSATION", conversation);

        return conversation;
      } catch (error) {
        console.error(error);
      }
    }),

  // onCreateConversation: protectedProcedure.subscription(({ ctx }) => {
  //   return observable((emit) => {
  //     const onConversation = (data: unknown) => emit.next(data);
  //     console.log("subcrtiption fired");
  //     ctx.ee.on("CREATE_CONVERSATION", onConversation);
  //     return () => {
  //       ctx.ee.off("CREATE_CONVERSATION", onConversation);
  //     };
  //   });
  // }),

  onCreateConversation: protectedProcedure.subscription(({ ctx }) => {
    return observable<ConversationType>((emit) => {
      const onConversation = (data: ConversationType) => emit.next(data);
      console.log("subcrtiption fired");
      ctx.ee.on("CREATE_CONVERSATION", onConversation);
      return () => {
        ctx.ee.off("CREATE_CONVERSATION", onConversation);
      };
    });
  }),

  getUserConversations: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    try {
      const conversations = await ctx.prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId: {
                equals: session.user.id,
              },
            },
          },
        },
        include: conversationPopulated,
      });
      return conversations;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
