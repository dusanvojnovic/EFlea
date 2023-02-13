import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import { CategoryPreviewItems } from "./CategoryPreviewItems";

interface CategoryPreviewProps {
  categoryName: string;
}

export const CategoryPreview: React.FunctionComponent<CategoryPreviewProps> = ({
  categoryName,
}) => {
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
            onClick={() => {
              setFieldIsExpanded(!fieldIsExpanded);
            }}
          >
            <IoIosArrowDown />
          </i>
        </IconContext.Provider>
      </div>
      {fieldIsExpanded && (
        <div className={`flex origin-top animate-grow-down justify-between`}>
          <CategoryPreviewItems category={categoryName} />
        </div>
      )}
    </div>
  );
};
