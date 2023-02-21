import React from "react";
import { Text, Heading, List, Flex } from "@chakra-ui/react";
import { useMyTeam } from "../../../providers";
import { PlayerPosition } from "../../../enums";
import { PlayerListItem, PlayerListItemPlaceholder } from "./PlayerListItem";
import { LineupList } from "./LineupList";

export const YourTeam: React.FC = () => {
  const {
    state: {
      coach,
      goalkeepers,
      pendingGoalkeepers,
      defenders,
      pendingDefenders,
      midfielders,
      pendingMidfielders,
      attackers,
      pendingAttackers,
      countDisplay,
    },
    showErrors,
  } = useMyTeam();
  return (
    <>
      <Flex
        direction={"row"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Heading as={"h2"} size={"lg"}>
          My team
        </Heading>
        <Text as={"b"}>{countDisplay}</Text>
      </Flex>
      <Heading as={"h3"} size={"md"} mb={3}>
        Coach
      </Heading>
      <List mb={3}>
        {coach && <PlayerListItem player={coach} />}
        {!coach && <PlayerListItemPlaceholder position={"Coach"} />}
      </List>
      {showErrors && !coach && (
        <Text color={"red"} fontSize={"sm"} mb={3} role={"alert"}>
          Coach is required.
        </Text>
      )}
      <Heading as={"h3"} size={"md"} mb={3}>
        Goalkeepers
      </Heading>
      <LineupList
        position={PlayerPosition.GOALKEEPER}
        players={goalkeepers}
        pending={pendingGoalkeepers}
        showErrors={showErrors}
      />
      <Heading as={"h3"} size={"md"} mb={3}>
        Defenders
      </Heading>
      <LineupList
        position={PlayerPosition.DEFENDER}
        players={defenders}
        pending={pendingDefenders}
        showErrors={showErrors}
      />
      <Heading as={"h3"} size={"md"} mb={3}>
        Midfielders
      </Heading>
      <LineupList
        position={PlayerPosition.MIDFIELDER}
        players={midfielders}
        pending={pendingMidfielders}
        showErrors={showErrors}
      />
      <Heading as={"h3"} size={"md"} mb={3}>
        Attackers
      </Heading>
      <LineupList
        position={PlayerPosition.ATTACKER}
        players={attackers}
        pending={pendingAttackers}
        showErrors={showErrors}
      />
    </>
  );
};
