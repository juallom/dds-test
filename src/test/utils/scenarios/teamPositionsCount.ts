import { LocalStorageState } from "../../../providers/my-team/types";
import { Team1, Team2, Team3 } from "../index";

export const teamPositionsCount: LocalStorageState = {
    name: "teamPositionsCount",
    coach: Team1.coach,
    players: [
        Team1["Player730"], // Goalkeeper
        Team1["Player282"], // Goalkeeper
        Team2["Player253"], // Goalkeeper
        Team2["Player159"], // Goalkeeper
        Team2["Player1897"], // Goalkeeper
        Team3["Player14382"], // Goalkeeper
    ],
    isStored: true,
};
