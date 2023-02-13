import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

interface CategoryPreviewItemsProps {
  category: string;
}

export const CategoryPreviewItems: React.FunctionComponent<
  CategoryPreviewItemsProps
> = ({ category }) => {
  const { data: items, isLoading } = trpc.item.getItemsForListPreview.useQuery({
    category,
  });

  return items && items.length > 0 ? (
    <div className="flex w-full items-center justify-between pt-2">
      <ul className="list-none pl-0">
        {items.map((item) => {
          return (
            <Link href={`/category/${category}/${item.id}`} key={item.id}>
              <li className="cursor-pointer py-1 text-3xl">
                {isLoading && <p>Loading...</p>}
                <p>{item.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
      <Link href={`/category/${category}`}>
        <button className="self-end rounded-md bg-red px-6 py-2 text-[1.3rem] text-white hover:bg-red">
          see all
        </button>
      </Link>
    </div>
  ) : (
    <p className="pt-2 text-3xl">There&apos;s no items in this category</p>
  );
};
