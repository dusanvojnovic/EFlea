import React from "react";
import { ItemPreview } from "./ItemPreview";
import { Item } from "@prisma/client";
import Link from "next/link";

interface ItemsListProps {
  items: Item[];
  category?: string;
}

export const ItemsList: React.FunctionComponent<ItemsListProps> = ({
  items,
  category,
}) => {
  return (
    <>
      <div className="my-32 flex flex-col items-center">
        {category ? (
          <h1 className="mb-14 text-[2.5rem] capitalize">{category}</h1>
        ) : null}
        <div className="grid w-[90vw] grid-cols-fluid gap-20 sm:mx-auto md:w-[55vw]">
          {items
            ? items.map((item) => {
                return (
                  <Link key={item.id} href={`/category/${category}/${item.id}`}>
                    <ItemPreview
                      id={item.id as string}
                      category={item.category}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                    />
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
