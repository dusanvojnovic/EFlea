import { FormAction } from "../components/Forms/AddNewItemForm/AddOrEditItem";
import { ItemType } from "../schema/item.schema";

export const validateFormData = (data: ItemType, formAction: FormAction) => {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      return false;
    }
    if (formAction == "add") {
      if (Array.isArray(data[key]) && data[key].length === 0) {
        return false;
      }
    }
  }

  return true;
};
