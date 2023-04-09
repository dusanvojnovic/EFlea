import { Conversation, ConversationParticipant, Message } from "@prisma/client";
import { Session } from "next-auth";
import React from "react";
import { ConversationPopulatedType } from "../../../schema/conversation.schema";
import { ConversationItem } from "./ConversationItem";

interface ConversationListProps {
  session: Session;
  conversations: ConversationPopulatedType[];
}

export const ConversationList: React.FunctionComponent<
  ConversationListProps
> = ({ session, conversations }) => {
  return (
    <div className="py-16 px-4">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};
