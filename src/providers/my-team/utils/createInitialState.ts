import { LocalStorageState, MyTeamState } from "../types";
import { LOCAL_STORAGE_KEY } from "../constants";
import { fillSideEffectsState } from "../utils";

export const createInitialState = (defaultState: MyTeamState): MyTeamState => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    const state: LocalStorageState = JSON.parse(stored);
    return {
      ...state,
      ...fillSideEffectsState(state.players),
    };
  } else {
    return defaultState;
  }
};
