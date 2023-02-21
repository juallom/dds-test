import { LocalStorageState } from "../types";
import { LOCAL_STORAGE_KEY } from "../constants";

export const saveToLocalStorage = (state: LocalStorageState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const deleteFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const reloadFromLocalStorage = (): LocalStorageState => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
};
