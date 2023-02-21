import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  Stack,
  Tag,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Coach, Player } from "../../../types";
import { RoleColor } from "../../../enums";

type PlayerAvatarSmallProps = {
  player: Player | Coach;
};

export const PlayerAvatarSmall: React.FC<PlayerAvatarSmallProps> = ({
  player,
}) => {
  const {
    position,
    photo,
    name,
    team: { logo, name: teamName },
  } = player;
  return (
    <>
      <ListItem mb={3}>
        <Flex direction={"row"} alignItems={"center"}>
          <Image src={photo} alt={""} height={"80px"} />
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
            <Box>
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
          </Box>
        </Flex>
      </ListItem>
    </>
  );
};
