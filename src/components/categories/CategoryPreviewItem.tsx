import Link from "next/link";
import React from "react";

interface CategoryPreviewItemProps {
  categoryName: string;
}

export const CategoryPreviewItem: React.FunctionComponent<
  CategoryPreviewItemProps
> = ({ categoryName }) => {
  return (
    <div className="flex min-w-[300px] flex-col">
      <h1 className="mb-0 border-b-2 border-dotted border-color-pinkish text-[2.5rem]">
        {categoryName}
      </h1>
      <div className="flex justify-between">
        <ul className="mb-0 mt-4 list-none pl-0">
          <li>
            <p className="mb-0 pb-0 text-[1.5rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.5rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.5rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.5rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.5rem]">item</p>
          </li>
        </ul>
        <Link href={`/categories/${categoryName}`}>
          <button className="self-end rounded-md bg-color-violet p-2 text-[1.15rem] text-white hover:bg-color-violet-light">
            show all
          </button>
        </Link>
      </div>
    </div>
  );
};
