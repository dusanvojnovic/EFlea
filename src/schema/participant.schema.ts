import { z } from "zod";
import { ConversationType } from "./conversation.schema";

export const conversationParticipantSchema = z.object({
  id: z.string(),
  userId: z.string(),
  conversationId: z.string().nullish(),
  conversation: z.custom<ConversationType>(),
  hasSeenLastMessage: z.boolean(),
});

export type ConversationParticipantType = z.TypeOf<
  typeof conversationParticipantSchema
>;
