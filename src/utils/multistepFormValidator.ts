import { ItemType } from "../schema/item.schema";

export const validateFormData = (data: ItemType) => {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      return false;
    }
    if (Array.isArray(data[key]) && data[key].length === 0) {
      return false;
    }
  }

  return true;
};
