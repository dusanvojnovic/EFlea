import React from "react";
import { CategoryPreviewItem } from "./CategoryPreviewItem";

interface CategoriesPreviewListProps {
  categories: string[];
}

export const CategoriesPreviewList: React.FunctionComponent<
  CategoriesPreviewListProps
> = ({ categories }) => {
  return (
    <div className="my-40 flex flex-col content-center justify-center">
      {/* <div className="mx-12 my-[12rem] grid w-[70%] grid-cols-fluid gap-[10rem] capitalize sm:mx-auto"> */}
      {categories.map((category) => {
        return <CategoryPreviewItem key={category} categoryName={category} />;
      })}
    </div>
  );
};
