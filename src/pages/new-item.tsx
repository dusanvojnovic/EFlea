import { NextPage } from "next";
import { AddOrEditItemForm } from "../components/Forms/AddNewItemForm/AddOrEditItem";

const INITIAL_DATA = {
  title: "",
  category: "",
  subcategory: "",
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
      <AddOrEditItemForm itemData={INITIAL_DATA} formAction="add" />
    </div>
  );
};

export default NewItemPage;
