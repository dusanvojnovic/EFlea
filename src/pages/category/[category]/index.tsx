import { Item } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { ItemsList } from "../../../components/Items/ItemsList";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { trpc } from "../../../utils/trpc";

const CategoryPage: React.FunctionComponent = ({
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: categoryItems } = trpc.item.getItemsByCategory.useQuery({
    category: category as string,
  });

  return (
    <div className="mx-auto flex justify-between">
      <div className="absolute left-36 ">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <ItemsList category={category} items={categoryItems as Item[]} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.params?.category;

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
    },
  };
};

export default CategoryPage;
