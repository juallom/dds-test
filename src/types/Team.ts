import { Coach } from "./Coach";
import { Player } from "./Player";

export type Team = {
  name: string;
  coach?: Coach;
  players: Player[];
};
