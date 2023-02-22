import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { EditUserForm } from "../../../components/Forms/EditUserForm/EditUserForm";

const EditUserPage: NextPage = ({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <EditUserForm userId={userId} />
    </div>
  );
};

export default EditUserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id;

  if (!userId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userId,
    },
  };
};
