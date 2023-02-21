import { parseCoach, parsePlayers } from "./parseFixtures";
import team1 from "../fixtures/team1.json";
import team2 from "../fixtures/team2.json";
import team3 from "../fixtures/team3.json";
import team6 from "../fixtures/team6.json";
import coach1 from "../fixtures/coach1.json";
import coach2 from "../fixtures/coach2.json";
import coach3 from "../fixtures/coach3.json";
import coach6 from "../fixtures/coach6.json";
import { CoachDTO, ResponseDTO, SquadDTO } from "../../../types";

export const Team1: any = {
  coach: parseCoach(coach1 as ResponseDTO<CoachDTO[]>),
  ...parsePlayers(team1 as ResponseDTO<SquadDTO[]>),
};

export const Team2: any = {
  coach: parseCoach(coach2 as ResponseDTO<CoachDTO[]>),
  ...parsePlayers(team2 as ResponseDTO<SquadDTO[]>),
};

export const Team3: any = {
  coach: parseCoach(coach3 as ResponseDTO<CoachDTO[]>),
  ...parsePlayers(team3 as ResponseDTO<SquadDTO[]>),
};

export const Team6: any = {
  coach: parseCoach(coach6 as ResponseDTO<CoachDTO[]>),
  ...parsePlayers(team6 as ResponseDTO<SquadDTO[]>),
};
