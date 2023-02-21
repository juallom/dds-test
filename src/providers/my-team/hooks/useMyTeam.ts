import React from "react";
import { MyTeamContext } from "../constants";

export const useMyTeam = () => {
  return React.useContext(MyTeamContext);
};
