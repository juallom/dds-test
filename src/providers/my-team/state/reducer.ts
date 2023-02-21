import { Reducer } from "react";
import {
  CoachActionType,
  MyTeamAction,
  PlayerActionType,
  PlayerPositionActionType,
  TeamUpdateActionType,
} from "./actions";
import { DEFAULT_MY_TEAM_STATE } from "../constants";
import { MyTeamState } from "../types";
import {
  fillSideEffectsState,
  saveToLocalStorage,
  deleteFromLocalStorage,
  reloadFromLocalStorage,
} from "../utils";

export const myTeamReducer: Reducer<MyTeamState, MyTeamAction> = (
  prevState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    /**
     * CoachActions
     */
    case CoachActionType.ADD_COACH:
      return {
        ...prevState,
        coach: payload,
      };

    case CoachActionType.REMOVE_COACH:
      return {
        ...prevState,
        coach: undefined,
      };

    /**
     * PlayerActions
     */
    case PlayerActionType.ADD_PLAYER:
      const addedPlayers = [...prevState.players, payload];
      return {
        ...prevState,
        players: addedPlayers,
        ...fillSideEffectsState(addedPlayers),
      };

    case PlayerActionType.REMOVE_PLAYER:
      const removedPlayers = [
        ...prevState.players.filter((player) => player.id !== payload.id),
      ];
      return {
        ...prevState,
        players: removedPlayers,
        ...fillSideEffectsState(removedPlayers),
      };

    /**
     * PlayerPositionActions
     */
    case PlayerPositionActionType.SWAP_PLAYERS_POSITION:
      const { players } = prevState;
      const x = players.findIndex((player) => player.id === payload.from.id);
      const y = players.findIndex((player) => player.id === payload.to.id);
      [players[x], players[y]] = [players[y], players[x]];
      const swappedState = {
        ...prevState,
        players: [...players],
        ...fillSideEffectsState(players),
      };
      saveToLocalStorage(swappedState);
      return swappedState;

    /**
     * TeamUpdateActions
     */
    case TeamUpdateActionType.CHANGE_NAME:
      return {
        ...prevState,
        name: payload || "",
      };

    case TeamUpdateActionType.SAVE_TEAM:
      const savedState = {
        ...prevState,
        isStored: true,
      };
      saveToLocalStorage(savedState);
      return savedState;

    case TeamUpdateActionType.DELETE_TEAM:
      deleteFromLocalStorage();
      return DEFAULT_MY_TEAM_STATE;

    case TeamUpdateActionType.RELOAD_STORED:
      const storedState = reloadFromLocalStorage();
      return {
        ...storedState,
        ...fillSideEffectsState(storedState.players),
      };

    /* istanbul ignore next */
    default:
      return prevState;
  }
};
