import { Team1 } from "../testData/TeamData";
import { pendingPlayersRebased } from "./pendingPlayersRebased";

export const maxLimitOfPlayers = {
  name: "defaultStoredTeam",
  coach: Team1.coach,
  players: pendingPlayersRebased,
  isStored: true,
};
