import React from "react";
import {
  Heading,
  Image,
  ListItem,
  Stack,
  Tag,
  VisuallyHidden,
  Box,
} from "@chakra-ui/react";
import { Coach, Player } from "../../../types";
import { RoleColor } from "../../../enums";
import { SwapButton } from "./SwapButton";

type PlayerAvatarProps = {
  player: Player | Coach;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player }) => {
  const {
    position,
    photo,
    name,
    team: { logo, name: teamName },
  } = player;
  return (
    <>
      <ListItem mb={3} flexGrow={0} flexBasis={"25%"}>
        <Stack direction={"column"} spacing={2} alignItems={"center"}>
          <Box position={"relative"}>
            {/* In this context the player photo and the country flag image are identified and described by surrounding text. */}
            {/* Setting alt attribute to an empty string will prevent accessibility tools to announce the image src url. */}
            <Image src={photo} alt={""} height={"80px"} />
            <Image
              src={logo}
              alt={""}
              display={"inline-block"}
              width={"30px"}
              height={"20px"}
              borderWidth={1}
              borderStyle={"solid"}
              position={"absolute"}
              bottom={0}
              left={0}
            />
          </Box>
          <Heading
            as={"h3"}
            size={"md"}
            width={"250px"}
            height={"24px"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            textAlign={"center"}
            title={name}
          >
            {name}
          </Heading>
          <Stack direction={"row"} spacing={3}>
            <Tag
              size={"md"}
              variant={"solid"}
              colorScheme={RoleColor[position]}
            >
              {position}
            </Tag>
            <VisuallyHidden>Team: {teamName}</VisuallyHidden>
            {player.position !== "Coach" && <SwapButton player={player} />}
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
};
