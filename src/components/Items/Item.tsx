import React, { useState } from "react";
import { IoThumbsUpOutline, IoThumbsDownOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Modal } from "../Modal/Modal";
import { Image } from "@prisma/client";
import Link from "next/link";

export const Item: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { asPath } = router;
  const { id } = router.query;
  const { data: item } = trpc.item.getItemById.useQuery({ id: id as string });
  const { data: user } = trpc.user.getUserById.useQuery({
    id: item?.userId as string,
  });
  const { data: imagePreview } = trpc.image.getPreviewPicture.useQuery({
    id: item?.id as string,
  });
  const { data: images } = trpc.image.getAllPictures.useQuery({
    id: item?.id as string,
  });
  const { mutateAsync: deleteItem } = trpc.item.deleteItem.useMutation();

  function removeItem(itemId: string) {
    deleteItem(
      { id: itemId },
      {
        onSuccess: () => {
          router.push(`/user/${user?.id}`);
        },
      }
    );
  }

  return (
    <>
      {isOpen ? (
        <Modal onClick={() => setIsOpen(false)}>
          <ImageSlider images={images as Image[]} />
        </Modal>
      ) : (
        <div className="my-48 mx-auto flex w-[90vw] flex-col sm:w-[65rem]">
          <div className="flex flex-col rounded-sm border border-green p-8 s:flex-row s:justify-around">
            <div className="mb-12 w-full s:mb-0 s:w-[50%] ">
              <h1 className="m-0 mb-12 self-start text-4xl">{item?.title}</h1>
              <h3 className="text-2xl">{item?.description}</h3>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between s:flex-col">
                  <img
                    src={imagePreview}
                    alt=""
                    className="mb-4 h-40 w-[50%] rounded-sm s:w-[100%]"
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="text-[1.7rem]">{user?.firstName}</h2>
                    <h3 className="mb-0 text-[1.35rem] s:mb-6">{user?.city}</h3>
                    <div className="flex  w-[35%] justify-between">
                      <div className="flex flex-col items-center self-center text-2xl">
                        <IconContext.Provider value={{ color: "#105652" }}>
                          <IoThumbsUpOutline />
                        </IconContext.Provider>
                        <h3>22</h3>
                      </div>
                      <div className="flex flex-col items-center self-center text-2xl">
                        <IconContext.Provider value={{ color: "#B91646" }}>
                          <IoThumbsDownOutline />
                        </IconContext.Provider>
                        <h3>1</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[50%] flex-col justify-between gap-2 xs:flex-row s:w-full s:flex-col">
                <h2 className="text-2xl">all users items</h2>
                {user?.id === item?.userId ? (
                  <div className="flex w-full flex-col justify-between">
                    <Link href={`${asPath}/edit`}>
                      <button className="w-[75%] self-start rounded-md bg-green py-2 px-4 text-light s:text-2xl">
                        edit item
                      </button>
                    </Link>
                    <button
                      onClick={() => removeItem(id as string)}
                      className="w-[75%] self-start  rounded-md bg-green py-2 px-4 text-light s:text-2xl"
                    >
                      delete item
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="self-start rounded-md bg-green py-2 px-4 text-light s:text-2xl"
                  >
                    contact user
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
