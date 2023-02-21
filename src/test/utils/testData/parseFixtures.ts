import { Coach, CoachDTO, Player, ResponseDTO, SquadDTO } from "../../../types";

export const parsePlayers = (
  fixture: ResponseDTO<SquadDTO[]>
): { [key: string]: Player } => {
  const team = fixture.response[0].team;
  return fixture.response[0].players.reduce<{ [key: string]: Player }>(
    (map, player) => {
      const { id, name, age, position, photo } = player;
      return {
        ...map,
        [`Player${id}`]: {
          id,
          name,
          age,
          position,
          photo,
          team,
        },
      };
    },
    {}
  );
};

export const parseCoach = (fixture: ResponseDTO<CoachDTO[]>): Coach => {
  const { id, name, age, photo, team } = fixture.response[0];
  return {
    id,
    name,
    age,
    photo,
    team,
    position: "Coach",
  };
};
