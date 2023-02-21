import React from "react";
import { CategoryPreview } from "./CategoryPreview";

interface CategoriesPreviewListProps {
  categories: Record<string, string[]>;
}

export const CategoriesPreviewList: React.FunctionComponent<
  CategoriesPreviewListProps
> = ({ categories }) => {
  const categoryPreview = [];
  for (const category in categories) {
    categoryPreview.push(
      <CategoryPreview key={category} categoryName={category} />
    );
  }
  return (
    <div className="my-40 flex flex-col content-center justify-center">
      {categoryPreview}
    </div>
  );
};
