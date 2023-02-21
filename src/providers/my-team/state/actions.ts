import { Coach, Player } from "../../../types";

export enum CoachActionType {
  ADD_COACH = "ADD_COACH",
  REMOVE_COACH = "REMOVE_COACH",
}

export enum PlayerActionType {
  ADD_PLAYER = "ADD_PLAYER",
  REMOVE_PLAYER = "REMOVE_PLAYER",
}

export enum PlayerPositionActionType {
  SWAP_PLAYERS_POSITION = "SWAP_PLAYERS_POSITION",
}

export enum TeamUpdateActionType {
  CHANGE_NAME = "CHANGE_NAME",
  SAVE_TEAM = "SAVE_TEAM",
  DELETE_TEAM = "DELETE_TEAM",
  RELOAD_STORED = "RELOAD_STORED",
}

export type CoachAction = {
  type: CoachActionType;
  payload: Coach;
};

export type PlayerAction = {
  type: PlayerActionType;
  payload: Player;
};

export type PlayerPositionAction = {
  type: PlayerPositionActionType;
  payload: {
    from: Player;
    to: Player;
  };
};

export type TeamUpdateAction = {
  type: TeamUpdateActionType;
  payload?: string;
};

export type MyTeamAction =
  | CoachAction
  | PlayerAction
  | PlayerPositionAction
  | TeamUpdateAction;
