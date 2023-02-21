import { Coach, Player } from "../../types";

export type AggregatedPlayers = [Player[], Player[], Player[], Player[]];

export type LocalStorageState = {
  name: string;
  coach?: Coach;
  players: Player[];
  isStored: boolean;
};

export type SideEffectsState = {
  playerIds: Set<number>;
  countedByCountry: Map<number, number>;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  attackers: Player[];
  pendingGoalkeepers: number;
  pendingDefenders: number;
  pendingMidfielders: number;
  pendingAttackers: number;
  countDisplay: string;
};

export type MyTeamState = LocalStorageState & SideEffectsState;

export type MyTeamContextType = {
  state: MyTeamState;
  showErrors: boolean;
  addPlayer: (player: Player) => Promise<void>;
  removePlayer: (player: Player) => void;
  swapPlayers: (from: Player, to: Player) => void;
  addCoach: (coach: Coach) => void;
  removeCoach: (coach: Coach) => void;
  saveTeam: () => Promise<void>;
  deleteTeam: VoidFunction;
  changeName: (name: string) => void;
  reloadFromStorage: VoidFunction;
};
