import Link from "next/link";
import React from "react";

interface CategoryPreviewItemProps {
  categoryName: string;
}

export const CategoryPreviewItem: React.FunctionComponent<
  CategoryPreviewItemProps
> = ({ categoryName }) => {
  return (
    // <div className="flex w-[80vw] flex-col lg:w-[35rem]">
    <div className="mx-auto mb-12 flex w-[80%] flex-col md:w-[45%]">
      <h1 className="mb-0 border-b-2 border-dotted border-red text-[2.75rem] font-bold">
        {categoryName}
      </h1>
      <div className=" flex justify-between">
        <ul className="mb-0 mt-4 list-none pl-0">
          <li>
            <p className="mb-0 pb-0 text-[1.75rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.75rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.75rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.75rem]">item</p>
          </li>
          <li>
            <p className="mb-0 pb-0 text-[1.75rem]">item</p>
          </li>
        </ul>
        <Link href={`/categories/${categoryName}`}>
          <button className="self-end rounded-md bg-red px-4 py-2 text-[1.3rem] text-white hover:bg-red">
            show all
          </button>
        </Link>
      </div>
    </div>
  );
};
