import { NextPage } from "next";
import { AddNewItemForm } from "../components/Forms/AddNewItemForm/AddNewItemForm";
import { NewForm } from "../components/Forms/AddNewItemForm/NewForm";

const NewItemPage: NextPage = () => {
  return (
    <div>
      {/* <AddNewItemForm /> */}
      <NewForm />
    </div>
  );
};

export default NewItemPage;
