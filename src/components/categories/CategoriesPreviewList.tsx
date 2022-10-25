import React from "react";
import { CategoryPreviewItem } from "./CategoryPreviewItem";

interface CategoriesPreviewListProps {
  categories: string[];
}

export const CategoriesPreviewList: React.FunctionComponent<
  CategoriesPreviewListProps
> = ({ categories }) => {
  return (
    <div className="mx-auto my-12 grid w-[70%] grid-cols-fluid gap-24 capitalize">
      {categories.map((category) => {
        return <CategoryPreviewItem key={category} categoryName={category} />;
      })}
    </div>
  );
};
