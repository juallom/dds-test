import { Player } from "../../../types";
import { AggregatedPlayers, SideEffectsState } from "../types";
import { PlayerPosition } from "../../../enums";
import { MAX_TEAM_COUNT, TeamMinRequirements } from "../constants";

export const fillSideEffectsState = (players: Player[]): SideEffectsState => {
  const count = players.reduce<Map<number, number>>((map, curr) => {
    if (map.has(curr.team.id)) {
      const currentValue = map.get(curr.team.id);
      /* istanbul ignore else */
      if (currentValue) {
        map.set(curr.team.id, currentValue + 1);
      }
    } else {
      map.set(curr.team.id, 1);
    }
    return map;
  }, new Map());
  const positions = players.reduce<AggregatedPlayers>(
    (aggregated, player) => {
      if (player.position === PlayerPosition.GOALKEEPER)
        aggregated[0].push(player);
      if (player.position === PlayerPosition.DEFENDER)
        aggregated[1].push(player);
      if (player.position === PlayerPosition.MIDFIELDER)
        aggregated[2].push(player);
      if (player.position === PlayerPosition.ATTACKER)
        aggregated[3].push(player);

      return aggregated;
    },
    [[], [], [], []]
  );
  const pG = TeamMinRequirements.Goalkeeper - positions[0].length;
  const pD = TeamMinRequirements.Defender - positions[1].length;
  const pM = TeamMinRequirements.Midfielder - positions[2].length;
  const pA = TeamMinRequirements.Attacker - positions[3].length;
  return {
    playerIds: new Set([...players.map((p) => p.id)]),
    countedByCountry: count,
    goalkeepers: positions[0],
    defenders: positions[1],
    midfielders: positions[2],
    attackers: positions[3],
    pendingGoalkeepers: pG < 0 ? 0 : pG,
    pendingDefenders: pD < 0 ? 0 : pD,
    pendingMidfielders: pM < 0 ? 0 : pM,
    pendingAttackers: pA < 0 ? 0 : pA,
    countDisplay: `${players.length} / ${MAX_TEAM_COUNT} Players`,
  };
};
