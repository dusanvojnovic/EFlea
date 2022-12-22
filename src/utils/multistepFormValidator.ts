import { ItemType } from "../schema/item.schema";

export const validateFormData = (data: ItemType) => {
  for (const key in data) {
    if (typeof data[key] === "string" && data[key].length === 0) {
      return false;
    }

    if (Array.isArray(data[key]) && data[key].length === 0) {
      return false;
    }

    if (typeof data[key] === "boolean" && data[key] == undefined) {
      return false;
    }
    return true;
  }
};
