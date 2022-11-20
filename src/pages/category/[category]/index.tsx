import { useRouter } from "next/router";
import React from "react";
import { ItemsList } from "../../../components/Items/ItemsList";
import { Sidebar } from "../../../components/Sidebar/Sidebar";

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FunctionComponent<CategoryPageProps> = ({}) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="mx-auto flex justify-between">
      <div className="absolute left-36 ">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <ItemsList category={category as string} />
      </div>
    </div>
  );
};

export default CategoryPage;
