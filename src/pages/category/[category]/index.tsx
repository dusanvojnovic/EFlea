import { Item } from "@prisma/client";
import React from "react";
import { ItemsList } from "../../../components/Items/ItemsList";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { trpc } from "../../../utils/trpc";

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FunctionComponent<CategoryPageProps> = ({
  category,
}) => {
  const { data: categoryItems } = trpc.item.getItemsByCategory.useQuery({
    category: category,
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

export default CategoryPage;
