import { NextPage } from "next";
import { AddNewItemForm } from "../components/Forms/AddNewItemForm/AddOrEditItem";

const INITIAL_DATA = {
  title: "",
  category: "",
  price: "",
  description: "",
  imgFiles: [],
  imagesUrl: [],
  acceptExchange: false,
  fixedPrice: false,
};

const NewItemPage: NextPage = () => {
  return (
    <div>
      <AddNewItemForm itemData={INITIAL_DATA} formAction="add" />
    </div>
  );
};

export default NewItemPage;
