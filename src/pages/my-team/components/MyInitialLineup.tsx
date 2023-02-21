import React from "react";
import { Stack, Heading, List } from "@chakra-ui/react";
import { useInitialLineup } from "../hooks/useInitialLineup";
import { PlayerAvatar } from "./PlayerAvatar";

export const MyInitialLineup: React.FC = () => {
  const { initialLineup } = useInitialLineup();
  return (
    <>
      <Heading as={"h2"} size={"lg"} mb={3}>
        Initial Lineup
      </Heading>
      <List>
        {initialLineup.map((line, index) => (
          <List
            as={Stack}
            direction={"row"}
            justifyContent={"space-evenly"}
            key={index}
            mb={3}
          >
            {line.map((player) => (
              <PlayerAvatar key={player.id} player={player} />
            ))}
          </List>
        ))}
      </List>
    </>
  );
};
