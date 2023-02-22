import { NextPage } from "next";
import Link from "next/link";
import { ItemsList } from "../../../components/Items/ItemsList";
import { Layout } from "../../../components/Layout/Layout";
import { trpc } from "../../../utils/trpc";

const UserPage: NextPage = () => {
  const { data: userItems, isLoading } = trpc.item.getItemsByUser.useQuery();

  return (
    <Layout>
      <Link href="/new-item">
        <button className="self-center rounded-md bg-red p-4 text-2xl text-light">
          add new item
        </button>
      </Link>
      {userItems && userItems.length > 0 && <ItemsList items={userItems} />}
      {userItems?.length === 0 && !isLoading && (
        <p>You dont have any items to sell</p>
      )}
    </Layout>
  );
};

export default UserPage;
