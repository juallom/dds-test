import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { ApiFootballClient } from "../../../providers/http/ApiFootballClient";
import { Team } from "../../../types";
import { useParams } from "react-router-dom";

type UsePlayersListReturn = {
  team?: Team;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: UseQueryResult["refetch"];
  setFilterValue: Dispatch<SetStateAction<string>>;
  filterValue: string;
};

export const usePlayersList = (): UsePlayersListReturn => {
  const { countryId } = useParams();
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const [filterValue, setFilterValue] = useState<string>("");
  const {
    data: teamData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(["getCoachAndPlayers", countryId], async () => {
    return await ApiFootballClient.getTeam(countryId as string);
  });

  useEffect(() => {
    if (teamData) {
      if (filterValue) {
        const escapedFilterValue = filterValue.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const regex = new RegExp(escapedFilterValue, "ig");
        const { coach, players } = teamData;
        setTeam({
          ...teamData,
          coach: coach?.name.match(regex) ? coach : undefined,
          players: players.filter((player) => player.name.match(regex)),
        });
      } else {
        setTeam(teamData);
      }
    }
  }, [teamData, filterValue, setTeam]);

  return {
    team,
    isLoading,
    isSuccess,
    isError,
    refetch,
    setFilterValue,
    filterValue,
  };
};
