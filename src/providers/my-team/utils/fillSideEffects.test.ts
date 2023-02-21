import { fillSideEffectsState } from "./fillSideEffects";
import { pendingPlayersRebased } from "../../../test/utils";

describe("fillSideEffects()", () => {
  it("should return 0 as pending count when evaluation results in a negative number", () => {
    const result = fillSideEffectsState(pendingPlayersRebased);
    expect(result.pendingGoalkeepers).toBe(0);
    expect(result.pendingDefenders).toBe(0);
    expect(result.pendingMidfielders).toBe(0);
    expect(result.pendingAttackers).toBe(0);
  });
});
