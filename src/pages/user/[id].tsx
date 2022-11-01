import Link from "next/link";
import React from "react";
import { ItemsList } from "../../components/Items/ItemsList";
import { Layout } from "../../components/Layout/Layout";

const UserPage: React.FunctionComponent = ({}) => {
  return (
    <Layout>
      <Link href="">
        <button className="self-center rounded-md bg-red p-4 text-2xl text-light">
          add new item
        </button>
      </Link>
      <ItemsList category="" />
    </Layout>
  );
};

export default UserPage;
