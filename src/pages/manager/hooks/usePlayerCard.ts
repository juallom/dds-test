import { Coach, Player } from "../../../types";
import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { useMyTeam } from "../../../providers";

export const usePlayerCard = (player: Player | Coach) => {
  const { addPlayer, addCoach, removePlayer, removeCoach } = useMyTeam();
  const toast = useToast();

  const add = useCallback(async () => {
    if (player.position === "Coach") {
      addCoach(player as Coach);
      toast({
        title: "Coach enrolled successfully.",
        status: "success",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
    } else {
      try {
        await addPlayer(player as Player);
        toast({
          title: "Player enrolled successfully.",
          status: "success",
          duration: 3000,
          variant: "left-accent",
          position: "top-right",
        });
      } catch (error) {
        toast({
          title: error as string,
          status: "error",
          duration: 5000,
          variant: "left-accent",
          position: "top-right",
        });
      }
    }
  }, [player, addPlayer, addCoach, toast]);

  const remove = useCallback(() => {
    if (player.position === "Coach") {
      removeCoach(player as Coach);
      toast({
        title: "Coach removed successfully.",
        status: "success",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
    } else {
      removePlayer(player as Player);
      toast({
        title: "Player removed successfully.",
        status: "success",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
    }
  }, [player, removeCoach, removePlayer, toast]);

  return {
    add,
    remove,
  };
};
