import Image from "next/image";
import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

interface ItemPreviewProps {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
}

export const ItemPreview: React.FunctionComponent<ItemPreviewProps> = ({
  id,
  title,
  category,
  price,
  description,
}) => {
  const { data: previewPicture } = trpc.image.getPreviewPicture.useQuery({
    id,
  });

  return (
    <div className="flex flex-col rounded-md border border-red">
      <Link href={`/category/${category}/${id}`}>
        <div className="flex cursor-pointer items-center justify-between bg-red px-4 py-2 text-light">
          <h1 className="text-[2rem]">{title}</h1>
          <h2 className="text-2xl">{price} $</h2>
        </div>
      </Link>
      <div className="flex justify-between p-4">
        <h3 className="mt-0 w-[60%] text-2xl ">{description}</h3>
        <Image
          className="rounded-md"
          src={previewPicture as string}
          alt={title}
          width={130}
          height={100}
        />
      </div>
    </div>
  );
};
