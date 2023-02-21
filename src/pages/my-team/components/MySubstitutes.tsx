import React from "react";
import { Heading, List } from "@chakra-ui/react";
import { useSubstitutes } from "../hooks/useSubstitutes";
import { PlayerAvatarSmall } from "./PlayerAvatarSmall";

export const MySubstitutes: React.FC = () => {
  const { substitutes } = useSubstitutes();
  return (
    <>
      <Heading as={"h2"} size={"lg"} mb={3}>
        Substitutes
      </Heading>
      <List>
        {substitutes.length > 0 &&
          substitutes.map((substitute) => (
            <PlayerAvatarSmall key={substitute.id} player={substitute} />
          ))}
      </List>
    </>
  );
};
