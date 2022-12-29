import { Item } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { ItemsList } from "../../components/Items/ItemsList";
import { Layout } from "../../components/Layout/Layout";
import { trpc } from "../../utils/trpc";

const UserPage: React.FunctionComponent = ({}) => {
  const { data: session } = useSession();
  if (!session?.user) return <h1>user not found</h1>;
  const { data: userItems } = trpc.item.getItemsByUser.useQuery({
    id: session.user.id,
  });

  return (
    <Layout>
      <Link href="/new-item">
        <button className="self-center rounded-md bg-red p-4 text-2xl text-light">
          add new item
        </button>
      </Link>
      <ItemsList items={userItems as Item[]} />
    </Layout>
  );
};

export default UserPage;
