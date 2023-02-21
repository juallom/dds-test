import React from "react";
import {
  Button,
  Image,
  ListItem,
  Spacer,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { PlayerPosition, RoleColor } from "../../../enums";
import { Player, Coach } from "../../../types";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { usePlayerCard } from "../hooks/usePlayerCard";

type PlayerListItemProps = {
  player: Player | Coach;
};

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player }) => {
  const {
    name,
    position,
    team: { logo, name: teamName },
  } = player;
  const { remove } = usePlayerCard(player);
  return (
    <ListItem
      borderLeftWidth={3}
      borderLeftColor={`${RoleColor[position]}.400`}
      pl={3}
    >
      <Stack spacing={3} direction={"row"} alignItems={"center"}>
        <Image
          src={logo}
          alt={`${teamName}.`}
          display={"inline-block"}
          width={"30px"}
          height={"20px"}
          borderWidth={1}
          borderStyle={"solid"}
        />
        <Text>{name}</Text>
        <Spacer />
        <Button
          h="24px"
          w="24px"
          size="sm"
          colorScheme={"blackAlpha"}
          variant={"ghost"}
          onClick={() => remove()}
        >
          <SmallCloseIcon color={"gray.400"} />
          <VisuallyHidden>Remove {name}.</VisuallyHidden>
        </Button>
      </Stack>
    </ListItem>
  );
};

export const PlayerListItemPlaceholder: React.FC<{
  position: PlayerPosition | "Coach";
}> = ({ position }) => (
  <ListItem
    borderLeftWidth={3}
    borderLeftColor={`${RoleColor[position]}.400`}
    pl={3}
  >
    <Text color={"gray.400"}>
      {position} <VisuallyHidden>placeholder.</VisuallyHidden>
    </Text>
  </ListItem>
);
