import { PlayerDTO, TeamDTO } from "./dto";

export type Player = PlayerDTO & {
  team: TeamDTO;
};
