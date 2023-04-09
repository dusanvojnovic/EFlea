import { Session } from "next-auth";
import React, { useState } from "react";
import { ConversationType } from "../../../schema/conversation.schema";
import { trpc } from "../../../utils/trpc";
import { ConversationList } from "./ConversationList";

interface ConversationWrapperProps {
  session: Session;
}

export const ConversationWrapper: React.FunctionComponent<
  ConversationWrapperProps
> = ({ session }) => {
  const { data: conversations } =
    trpc.conversation.getUserConversations.useQuery();

  const [userConversations, setUserConversations] = useState(conversations);

  // console.log(conversations);
  trpc.conversation.onCreateConversation.useSubscription(undefined, {
    onData(data) {
      console.log(data, "data");
      // setUserConversations((convs) => [...(convs || []), conversation])
    },
    onError(error) {
      console.error("Subscription error: ", error);
    },
  });

  return (
    <div className="w-full bg-slate-400 py-6 px-3 md:w-[400px]">
      {/* loading spinner */}
      <ConversationList session={session} conversations={conversations || []} />
    </div>
  );
};
