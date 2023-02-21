import { useMyTeam } from "../../../providers";
import { useEffect, useState } from "react";
import { Player } from "../../../types";
import { TeamLineUpCount } from "../../../providers/my-team/constants";

export const useInitialLineup = () => {
  const {
    state: { goalkeepers, defenders, midfielders, attackers },
  } = useMyTeam();
  const [initialLineup, setInitialLineup] = useState<Player[][]>([]);

  useEffect(() => {
    setInitialLineup([
      goalkeepers.slice(0, TeamLineUpCount.Goalkeeper),
      defenders.slice(0, TeamLineUpCount.Defender),
      midfielders.slice(0, TeamLineUpCount.Midfielder),
      attackers.slice(0, TeamLineUpCount.Attacker),
    ]);
  }, [goalkeepers, defenders, midfielders, attackers]);

  return {
    initialLineup,
  };
};
