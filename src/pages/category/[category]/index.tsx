import { useRouter } from "next/router";
import React from "react";
import { ItemsList } from "../../../components/Items/ItemsList";

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FunctionComponent<CategoryPageProps> = ({}) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="mx-auto my-0 flex flex-col">
      <ItemsList category={category as string} />
    </div>
  );
};

export default CategoryPage;
