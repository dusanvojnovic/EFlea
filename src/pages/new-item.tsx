import { NextPage } from "next";
import { AddNewItemForm } from "../components/Forms/AddNewItemForm/AddNewItemForm";

const NewItemPage: NextPage = () => {
  return (
    <div>
      <AddNewItemForm />
    </div>
  );
};

export default NewItemPage;
