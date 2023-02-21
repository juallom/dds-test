import { TeamDTO } from "./TeamDTO";

export type CoachDTO = {
  id: number;
  name: string;
  age: number;
  photo: string;
  team: TeamDTO;
};
