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
    <div>
      <h1>{category}</h1>
      <div>
        <ItemsList category={category as string} />
      </div>
    </div>
  );
};

export default CategoryPage;
