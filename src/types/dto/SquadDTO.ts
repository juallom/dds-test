import { TeamDTO } from "./TeamDTO";
import { PlayerDTO } from "./PlayerDTO";

export type SquadDTO = {
  team: TeamDTO;
  players: PlayerDTO[];
};
