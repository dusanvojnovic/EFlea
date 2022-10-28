import React from "react";
import { ItemPreview } from "./ItemPreview";

interface ItemsListProps {
  category: string;
}

const PICTURE_URL =
  "https://thegadgetflow.com/wp-content/uploads/2020/01/Dell-2020-XPS-13-Lightweight-Laptop-01-1.jpg";

export const ItemsList: React.FunctionComponent<ItemsListProps> = ({
  category,
}) => {
  return (
    <>
      <div className="my-32 flex flex-col items-center">
        <h1 className="mb-14 text-[2.5rem] capitalize">{category}</h1>
        <div className="grid w-[90vw] grid-cols-fluid gap-20 sm:mx-auto md:w-[55vw]">
          <ItemPreview
            category={category}
            id={1}
            title="first item"
            price={300}
            pictureUrl={PICTURE_URL}
            description="a very first item to sell a to sellla very first item to sella very first item to sell"
          />
          <ItemPreview
            id={2}
            category={category}
            title="first item"
            price={300}
            pictureUrl={PICTURE_URL}
            description="a very first item to sell"
          />
          <ItemPreview
            id={2}
            category={category}
            title="first item"
            price={300}
            pictureUrl={PICTURE_URL}
            description="a very first item to sell"
          />
          <ItemPreview
            id={2}
            category={category}
            title="first item"
            price={300}
            pictureUrl={PICTURE_URL}
            description="a very first item to sell"
          />
          <ItemPreview
            id={2}
            category={category}
            title="first item"
            price={300}
            pictureUrl={PICTURE_URL}
            description="a very first item to sell"
          />
        </div>
      </div>
    </>
  );
};
