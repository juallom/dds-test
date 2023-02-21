import React, { useCallback } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  VisuallyHidden,
  List,
  ListItem,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Player } from "../../../types";
import { useSwapOptions } from "../hooks/useSwapOptions";
import { SettingsIcon } from "@chakra-ui/icons";
import { useMyTeam } from "../../../providers";

type SwapButtonProps = {
  player: Player;
};

export const SwapButton: React.FC<SwapButtonProps> = ({ player }) => {
  const { swapPlayers } = useMyTeam();
  const { swapOptions } = useSwapOptions(player);
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const onSwap = useCallback(
    (to: Player) => {
      swapPlayers(player, to);
      toast({
        title: "Players swapped successfully.",
        status: "success",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
      onClose();
    },
    [player, swapPlayers, onClose, toast]
  );

  return (
    <>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button size={"xs"}>
            <SettingsIcon color={"gray.400"} />
            <VisuallyHidden>Swap {player.name} position.</VisuallyHidden>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Swap positions.</PopoverHeader>
          <PopoverBody>
            <List textAlign={"center"}>
              {swapOptions.map((option) => (
                <ListItem key={option.id}>
                  <Button variant={"link"} onClick={() => onSwap(option)}>
                    {option.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
