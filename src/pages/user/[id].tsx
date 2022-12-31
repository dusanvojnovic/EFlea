import { Item } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ItemsList } from "../../components/Items/ItemsList";
import { Layout } from "../../components/Layout/Layout";
import { trpc } from "../../utils/trpc";

const UserPage: React.FunctionComponent = ({}) => {
  const { data: userItems } = trpc.item.getItemsByUser.useQuery();

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
