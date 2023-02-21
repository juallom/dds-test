import { canAddPlayer, buildPendingErrorMessage } from "./canAddPlayer";
import { Team1 } from "../../../test/utils";
import { MyTeamState } from "../types";

const playerIds = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
const countedByCountry = new Map();

describe("canAddPlayer()", () => {
  it("should resolve when pending defenders is greater than 0", async () => {
    const state = {
      pendingGoalkeepers: 0,
      pendingDefenders: 1,
      pendingMidfielders: 0,
      pendingAttackers: 0,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player2920"], state)).resolves.toBe("");
  });
  it("should resolve when pending midfielders is greater than 0", async () => {
    const state = {
      pendingGoalkeepers: 0,
      pendingDefenders: 0,
      pendingMidfielders: 1,
      pendingAttackers: 0,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player629"], state)).resolves.toBe("");
  });
  it("should resolve when pending attackers is greater than 0", async () => {
    const state = {
      pendingGoalkeepers: 0,
      pendingDefenders: 0,
      pendingMidfielders: 0,
      pendingAttackers: 1,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player1946"], state)).resolves.toBe("");
  });
  it("should resolve when pending defenders is  0", async () => {
    const state = {
      pendingGoalkeepers: 0,
      pendingDefenders: 0,
      pendingMidfielders: 1,
      pendingAttackers: 0,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player2920"], state)).resolves.toBe("");
  });
  it("should resolve when pending midfielders is 0", async () => {
    const state = {
      pendingGoalkeepers: 0,
      pendingDefenders: 0,
      pendingMidfielders: 0,
      pendingAttackers: 1,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player629"], state)).resolves.toBe("");
  });
  it("should resolve when pending attackers is 0", async () => {
    const state = {
      pendingGoalkeepers: 1,
      pendingDefenders: 0,
      pendingMidfielders: 0,
      pendingAttackers: 0,
      playerIds,
      countedByCountry,
    } as MyTeamState;
    await expect(canAddPlayer(Team1["Player1946"], state)).resolves.toBe("");
  });
});

describe("buildPendingErrorMessage()", () => {
  it("all messages plural", () => {
    expect(buildPendingErrorMessage(2, 2, 2, 2)).toBe(
      "2 goalkeepers, 2 defenders, 2 midfielders and 2 attackers"
    );
  });
  it("all messages singular", () => {
    expect(buildPendingErrorMessage(1, 1, 1, 1)).toBe(
      "1 goalkeeper, 1 defender, 1 midfielder and 1 attacker"
    );
  });
  it("only goalkeepers", () => {
    expect(buildPendingErrorMessage(3, 0, 0, 0)).toBe("3 goalkeepers");
  });
  it("empty message", () => {
    expect(buildPendingErrorMessage(0, 0, 0, 0)).toBe("");
  });
});
