import { Player } from "../../../types";
import { MAX_COMPONENTS_PER_COUNTRY, MAX_TEAM_COUNT } from "../constants";
import { PlayerPosition } from "../../../enums";
import { MyTeamState } from "../types";

export const canAddPlayer = (player: Player, state: MyTeamState) => {
  return new Promise((resolve, reject) => {
    const {
      playerIds,
      countedByCountry,
      pendingGoalkeepers,
      pendingDefenders,
      pendingMidfielders,
      pendingAttackers,
    } = state;

    if (playerIds.size === MAX_TEAM_COUNT) {
      return reject(
        "You have reached the maximum allowed players for your team."
      );
    }

    if (countedByCountry.has(player.team.id)) {
      const count = countedByCountry.get(player.team.id);
      if (count && count >= MAX_COMPONENTS_PER_COUNTRY) {
        return reject(
          `You have reached the maximum allowed players for "${player.team.name}" team.`
        );
      }
    }

    let restPendingCount;
    switch (player.position) {
      case PlayerPosition.GOALKEEPER:
        if (pendingGoalkeepers > 0) {
          return resolve("");
        } else {
          restPendingCount =
            pendingDefenders + pendingMidfielders + pendingAttackers;
        }
        break;
      case PlayerPosition.DEFENDER:
        if (pendingDefenders > 0) {
          return resolve("");
        } else {
          restPendingCount =
            pendingGoalkeepers + pendingMidfielders + pendingAttackers;
        }
        break;
      case PlayerPosition.MIDFIELDER:
        if (pendingMidfielders > 0) {
          return resolve("");
        } else {
          restPendingCount =
            pendingDefenders + pendingGoalkeepers + pendingAttackers;
        }
        break;
      case PlayerPosition.ATTACKER:
        if (pendingAttackers > 0) {
          return resolve("");
        } else {
          restPendingCount =
            pendingDefenders + pendingMidfielders + pendingGoalkeepers;
        }
        break;
    }

    if (restPendingCount + playerIds.size < MAX_TEAM_COUNT) {
      return resolve("");
    } else {
      const message = buildPendingErrorMessage(
        pendingGoalkeepers,
        pendingDefenders,
        pendingMidfielders,
        pendingAttackers
      );

      return reject(
        `You still need to enroll ${message} to fulfill team requirements.`
      );
    }
  });
};

export const buildPendingErrorMessage = (
  pendingGoalkeepers: number,
  pendingDefenders: number,
  pendingMidfielders: number,
  pendingAttackers: number
) => {
  if (
    pendingGoalkeepers +
      pendingDefenders +
      pendingMidfielders +
      pendingAttackers <=
    0
  ) {
    return "";
  }
  const pendingMessages = [];

  /* istanbul ignore else */
  if (pendingGoalkeepers > 0)
    pendingMessages.push(
      `${pendingGoalkeepers} goalkeeper${pendingGoalkeepers > 1 ? "s" : ""}`
    );
  /* istanbul ignore else */
  if (pendingDefenders > 0)
    pendingMessages.push(
      `${pendingDefenders} defender${pendingDefenders > 1 ? "s" : ""}`
    );
  /* istanbul ignore else */
  if (pendingMidfielders > 0)
    pendingMessages.push(
      `${pendingMidfielders} midfielder${pendingMidfielders > 1 ? "s" : ""}`
    );
  /* istanbul ignore else */
  if (pendingAttackers > 0)
    pendingMessages.push(
      `${pendingAttackers} attacker${pendingAttackers > 1 ? "s" : ""}`
    );

  return (() => {
    if (pendingMessages.length === 1) {
      return pendingMessages[0];
    } else {
      const popped = pendingMessages.pop();
      return `${pendingMessages.join(", ")} and ${popped}`;
    }
  })();
};
