import { Session } from "next-auth";
import { ConversationWrapper } from "./Conversation/ConversationWrapper";
import { FeedWrapper } from "./Feed/FeedWrapper";

interface ChatProps {
  session: Session;
}

export const Chat: React.FunctionComponent<ChatProps> = ({ session }) => {
  return (
    <div className="flex h-full">
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
};
