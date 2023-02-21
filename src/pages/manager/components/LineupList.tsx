import React from "react";
import { Player } from "../../../types";
import { PlayerPosition } from "../../../enums";
import { PlayerListItem, PlayerListItemPlaceholder } from "./PlayerListItem";
import { List, Text } from "@chakra-ui/react";

type LineupListProps = {
  pending: number;
  players: Player[];
  position: PlayerPosition;
  showErrors: boolean;
};

export const LineupList: React.FC<LineupListProps> = ({
  players,
  pending,
  position,
  showErrors,
}) => (
  <>
    <List mb={3}>
      {players.length > 0 && (
        <>
          {players.map((player) => (
            <PlayerListItem key={player.id} player={player} />
          ))}
        </>
      )}
      {pending > 0 && (
        <>
          {Array.from(Array(pending).keys()).map((p, i) => (
            <PlayerListItemPlaceholder key={i} position={position} />
          ))}
        </>
      )}
    </List>
    {showErrors && pending > 0 && (
      <Text color={"red"} fontSize={"sm"} mb={3} role={"alert"}>
        {pending === 1
          ? `1 pending ${position.toLowerCase()} required.`
          : `${pending} pending ${position.toLowerCase()}s required.`}
      </Text>
    )}
  </>
);
