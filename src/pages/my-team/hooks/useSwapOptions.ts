import { useMyTeam } from "../../../providers";
import { useEffect, useState } from "react";
import { Player } from "../../../types";
import { PlayerPosition } from "../../../enums";

export const useSwapOptions = (player: Player) => {
  const {
    state: { goalkeepers, defenders, midfielders, attackers },
  } = useMyTeam();
  const [swapOptions, setSwapOptions] = useState<Player[]>([]);

  useEffect(() => {
    if (player.position === PlayerPosition.GOALKEEPER) {
      setSwapOptions(goalkeepers.filter((p) => player.id !== p.id));
    }
    if (player.position === PlayerPosition.DEFENDER) {
      setSwapOptions(defenders.filter((p) => player.id !== p.id));
    }
    if (player.position === PlayerPosition.MIDFIELDER) {
      setSwapOptions(midfielders.filter((p) => player.id !== p.id));
    }
    if (player.position === PlayerPosition.ATTACKER) {
      setSwapOptions(attackers.filter((p) => player.id !== p.id));
    }
  }, [player, goalkeepers, defenders, midfielders, attackers]);

  return {
    swapOptions,
  };
};
