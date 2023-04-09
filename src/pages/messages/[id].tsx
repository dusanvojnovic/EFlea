import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { Chat } from "../../components/Chat/Chat";

const ChatPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-200 absolute inset-0 h-screen">
      <Chat session={session as Session} />
    </div>
  );
};

export default ChatPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
