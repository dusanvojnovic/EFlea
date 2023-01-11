/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { AddNewItemForm } from "../../../../components/Forms/AddNewItemForm/AddOrEditItem";
import { trpc } from "../../../../utils/trpc";

const Edit: NextPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: itemData } = trpc.item.getItemById.useQuery({ id });
  const { data: imgUrl } = trpc.image.getAllPictures.useQuery({ id });
  const imagesUrl: string[] = [];
  if (!imgUrl) {
    return <div>not found </div>;
  } else {
    imgUrl.forEach((img) => imagesUrl.push(img.url));
  }

  return (
    <div>
      <AddNewItemForm
        itemData={{ ...itemData!, imagesUrl }}
        formAction="edit"
        itemId={id}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};

export default Edit;
