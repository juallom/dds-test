import axios from "axios";
import {
  ResponseDTO,
  CoachDTO,
  CupParticipantDTO,
  SquadDTO,
  Country,
  Team,
} from "../../types";

const BASE_PATH = "/v3";
const WORLD_CUP_ID = 1;
const SEASON = 2022;

type ApiRoutesKeys = "COUNTRIES" | "PLAYERS" | "COACHES";
export const ApiRoutes: Record<ApiRoutesKeys, string> = {
  COUNTRIES: `${BASE_PATH}/teams`,
  PLAYERS: `${BASE_PATH}/players/squads`,
  COACHES: `${BASE_PATH}/coachs`,
};

export class ApiFootballClient {
  static async getCountries(): Promise<Country[]> {
    const cupParticipantsResponse = await axios.get<
      ResponseDTO<CupParticipantDTO[]>
    >(`${ApiRoutes.COUNTRIES}?league=${WORLD_CUP_ID}&season=${SEASON}`);

    const participants = cupParticipantsResponse.data.response;

    return participants.map(({ team }) => ({
      ...team,
    }));
  }

  static async getTeam(countryId: string): Promise<Team> {
    const [coachesResponse, playersResponse] = await Promise.all([
      axios.get<ResponseDTO<CoachDTO[]>>(
        `${ApiRoutes.COACHES}?team=${countryId}`
      ),
      axios.get<ResponseDTO<SquadDTO[]>>(
        `${ApiRoutes.PLAYERS}?team=${countryId}`
      ),
    ]);
    const currentCoach = coachesResponse.data.response[0];
    const { team, players } = playersResponse.data.response[0];
    return {
      name: currentCoach.team.name,
      coach: {
        ...currentCoach,
        position: "Coach",
      },
      players: players.map((player) => ({ ...player, team })),
    };
  }
}
