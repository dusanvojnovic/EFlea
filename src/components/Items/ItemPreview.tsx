import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItemPreviewProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  pictureUrl: string;
}

export const ItemPreview: React.FunctionComponent<ItemPreviewProps> = ({
  id,
  title,
  category,
  price,
  description,
  pictureUrl,
}) => {
  return (
    <div className="mb-10 flex flex-col rounded-md border border-red">
      <Link href={`/categories/${category}/${id}`}>
        <div className="flex cursor-pointer items-center justify-between bg-red p-4 text-light">
          <h1 className="text-[2rem]">{title}</h1>
          <h2 className="text-2xl">{price} $</h2>
        </div>
      </Link>
      <div className="flex justify-between p-4">
        <h3 className="mt-0 w-[60%] text-2xl ">{description}</h3>
        <Image
          className="rounded-md"
          src={pictureUrl}
          alt=""
          width={130}
          height={100}
          // layout="responsive"
          // objectFit="fill"
        />
      </div>
    </div>
  );
};
