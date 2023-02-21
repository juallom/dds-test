import { LocalStorageState } from "../../../providers/my-team/types";
import { Team1, Team2, Team3 } from "../index";

export const pendingSingular: LocalStorageState = {
  name: "pendingSingular",
  players: [
    Team1["Player2918"], // Goalkeeper

    Team1["Player162"], // Defender
    Team1["Player2920"], // Defender
    Team2["Player2725"], // Defender

    Team2["Player272"], // Midfielder
    Team2["Player1271"], // Midfielder
    Team3["Player7332"], // Midfielder

    Team3["Player1331"], // Attacker
  ],
  isStored: true,
};
