import { ConversationPopulatedType } from "../../../schema/conversation.schema";

interface ConversationItemProps {
  conversation: ConversationPopulatedType;
}

export const ConversationItem: React.FunctionComponent<
  ConversationItemProps
> = ({ conversation }) => {
  return (
    <div className="my-2 rounded-md p-4 hover:bg-slate-300">
      {conversation.id}
    </div>
  );
};
