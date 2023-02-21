import { useMyTeam } from "../../../providers";
import { useEffect, useState } from "react";
import { Player } from "../../../types";
import { TeamLineUpCount } from "../../../providers/my-team/constants";

export const useSubstitutes = () => {
  const {
    state: { goalkeepers, defenders, midfielders, attackers },
  } = useMyTeam();
  const [substitutes, setSubstitutes] = useState<Player[]>([]);

  useEffect(() => {
    setSubstitutes(
      [
        goalkeepers.slice(TeamLineUpCount.Goalkeeper),
        defenders.slice(TeamLineUpCount.Defender),
        midfielders.slice(TeamLineUpCount.Midfielder),
        attackers.slice(TeamLineUpCount.Attacker),
      ].flat()
    );
  }, [goalkeepers, defenders, midfielders, attackers]);

  return {
    substitutes,
  };
};
