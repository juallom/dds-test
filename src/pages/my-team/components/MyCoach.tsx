import React from "react";
import { Heading, List } from "@chakra-ui/react";
import { useMyTeam } from "../../../providers";
import { PlayerAvatarSmall } from "./PlayerAvatarSmall";

export const MyCoach: React.FC = () => {
  const {
    state: { coach },
  } = useMyTeam();

  // Sanity check to avoid accessing object properties of undefined
  // When accessing MyTeam page MyTeamState.coach is enforced to be defined at root level
  /* istanbul ignore next */
  if (!coach) {
    return null;
  }

  return (
    <>
      <Heading as={"h2"} size={"lg"} mb={3}>
        Coach
      </Heading>
      <List>
        <PlayerAvatarSmall player={coach} />
      </List>
    </>
  );
};
