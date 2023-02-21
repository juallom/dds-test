import React from "react";
import { Coach, Player } from "../../../types";
import { RoleColor } from "../../../enums";
import {
  Box,
  Image,
  Heading,
  Flex,
  Stack,
  Text,
  Spacer,
  Button,
  Tag,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useMyTeam } from "../../../providers";
import { usePlayerCard } from "../hooks/usePlayerCard";

type PlayerCardProps = {
  player: Player | Coach;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const {
    id,
    name,
    age,
    position,
    photo,
    team: { logo, name: teamName },
  } = player;

  const {
    state: { coach, playerIds },
  } = useMyTeam();
  const { add, remove } = usePlayerCard(player);
  const isEnrolled =
    player.position === "Coach" ? coach?.id === id : playerIds.has(id);

  return (
    <>
      <Box
        borderBottomWidth={4}
        borderBottomColor={`${RoleColor[position]}.400`}
      >
        <Flex direction={"row"} alignItems={"flex-end"}>
          <Image src={photo} alt={""} />
          <Box flexGrow={1} p={3}>
            <Heading as={"h3"} size={"md"} mb={2}>
              <Stack spacing={3} direction={"row"} alignItems={"center"}>
                <Image
                  src={logo}
                  alt={""}
                  display={"inline-block"}
                  width={"30px"}
                  height={"20px"}
                  borderWidth={1}
                  borderStyle={"solid"}
                />
                <Text>{name}</Text>
              </Stack>
            </Heading>
            <Flex alignItems={"flex-end"}>
              <Box>
                <Text>Age: {age}</Text>
                <Tag
                  size={"md"}
                  variant={"solid"}
                  colorScheme={RoleColor[position]}
                  mt={2}
                >
                  {position}
                </Tag>
                <VisuallyHidden>Team: {teamName}</VisuallyHidden>
              </Box>
              <Spacer />
              {isEnrolled && (
                <Button
                  onClick={remove}
                  colorScheme={RoleColor[position]}
                  variant={"ghost"}
                >
                  Revoke <VisuallyHidden>enrollment for {name}.</VisuallyHidden>
                </Button>
              )}
              {!isEnrolled && (
                <Button
                  onClick={add}
                  colorScheme={RoleColor[position]}
                  variant={"outline"}
                >
                  Enroll <VisuallyHidden>{name}.</VisuallyHidden>
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
