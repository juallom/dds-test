import { PlayerPosition } from "../../enums";

export type PlayerDTO = {
  id: number;
  name: string;
  age: number;
  position: PlayerPosition;
  photo: string;
};
