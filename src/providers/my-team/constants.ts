import React from "react";
import { MyTeamContextType, MyTeamState } from "./types";
import { PlayerPosition } from "../../enums";

export const MAX_TEAM_COUNT = 16;
export const LOCAL_STORAGE_KEY = "MY_ADIDAS_FOOTBALL_TEAM_WC_2022";

export const MAX_COMPONENTS_PER_COUNTRY = 4;

export const TeamMinRequirements: Record<PlayerPosition, number> = {
  [PlayerPosition.GOALKEEPER]: 2,
  [PlayerPosition.DEFENDER]: 4,
  [PlayerPosition.MIDFIELDER]: 4,
  [PlayerPosition.ATTACKER]: 2,
};

export const TeamLineUpCount: Record<PlayerPosition, number> = {
  [PlayerPosition.GOALKEEPER]: 1,
  [PlayerPosition.DEFENDER]: 4,
  [PlayerPosition.MIDFIELDER]: 4,
  [PlayerPosition.ATTACKER]: 2,
};

export const MyTeamContext = React.createContext<MyTeamContextType>(null!);

export const DEFAULT_MY_TEAM_STATE: MyTeamState = {
  name: "My Adidas Team",
  players: [],
  playerIds: new Set<number>(),
  countedByCountry: new Map<number, number>(),
  goalkeepers: [],
  defenders: [],
  midfielders: [],
  attackers: [],
  pendingGoalkeepers: TeamMinRequirements.Goalkeeper,
  pendingDefenders: TeamMinRequirements.Defender,
  pendingMidfielders: TeamMinRequirements.Midfielder,
  pendingAttackers: TeamMinRequirements.Attacker,
  countDisplay: `0/${MAX_TEAM_COUNT} Players`,
  isStored: false,
};
