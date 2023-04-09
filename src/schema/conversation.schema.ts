import { Prisma } from "@prisma/client";
import z from "zod";
import { conversationPopulated } from "../../prisma/helpers";
import { MessageType } from "./message.schema";
import { CreateUserType } from "./user.schema";

const conversationParticipantSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.custom<CreateUserType>(),
  conversationId: z.string().nullable().optional(),
  hasSeenLastMessage: z.boolean(),
});

const conversationSchema = z.object({
  id: z.string(),
  createdAd: z.date(),
  updatedAt: z.date(),
  participants: z.array(conversationParticipantSchema).transform((data) =>
    data.map((p) => ({
      ...p,
      conversation: data,
    }))
  ),
  messages: z.custom<MessageType>().array(),
  latestMessageId: z.string().nullable().optional(),
  latestMessage: z.custom<MessageType>().array(),
});

export type ConversationType = z.TypeOf<typeof conversationSchema>;
export type ConversationParticipantType = z.TypeOf<
  typeof conversationParticipantSchema
>;

export type ConversationPopulatedType = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;
