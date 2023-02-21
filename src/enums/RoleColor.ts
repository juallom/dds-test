import { PlayerPosition } from "./PlayerPosition";

export const RoleColor: Record<PlayerPosition | "Coach", string> = {
  "Coach": "facebook",
  [PlayerPosition.GOALKEEPER]: "cyan",
  [PlayerPosition.DEFENDER]: "teal",
  [PlayerPosition.MIDFIELDER]: "yellow",
  [PlayerPosition.ATTACKER]: "red",
};
