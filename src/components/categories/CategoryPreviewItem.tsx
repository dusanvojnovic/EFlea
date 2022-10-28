import Link from "next/link";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

interface CategoryPreviewItemProps {
  categoryName: string;
}

export const CategoryPreviewItem: React.FunctionComponent<
  CategoryPreviewItemProps
> = ({ categoryName }) => {
  const [fieldIsExpanded, setFieldIsExpanded] = useState<boolean>(false);

  return (
    <div className=" mx-auto mb-12 flex w-[80%] origin-top flex-col lg:w-[45%]">
      <div className="flex justify-between border-b border-dotted border-red">
        <h1 className="mb-0 text-[2.15rem] font-bold md:text-[2.75rem]">
          {categoryName}
        </h1>
        <IconContext.Provider value={{ color: "black" }}>
          <i
            className={`cursor-pointer self-center text-[1.8rem] duration-300 md:text-[2.2rem] ${
              fieldIsExpanded ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setFieldIsExpanded(!fieldIsExpanded)}
          >
            <IoIosArrowDown />
          </i>
        </IconContext.Provider>
      </div>
      {fieldIsExpanded && (
        <div className={`flex origin-top animate-grow-down justify-between`}>
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
              see all
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
