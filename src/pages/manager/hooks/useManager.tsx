import { RefObject, useCallback, useRef } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMyTeam } from "../../../providers";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../enums";

export const useManager = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    state: { name: teamName },
    saveTeam,
    deleteTeam,
    showErrors,
    reloadFromStorage,
  } = useMyTeam();
  const inputRef: RefObject<HTMLInputElement> | null = useRef(null);
  const isInvalid = showErrors && !Boolean(teamName);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = useCallback(() => {
    deleteTeam();
    onClose();
    toast({
      title: "Team deleted successfully.",
      status: "success",
      duration: 3000,
      variant: "left-accent",
      position: "top-right",
    });
  }, [deleteTeam, onClose, toast]);

  const onSave = useCallback(async () => {
    try {
      await saveTeam();
      toast({
        title: "Team saved successfully.",
        status: "success",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
      navigate(AppRoute.MY_TEAM);
    } catch (error) {
      if (teamName.length <= 0) {
        inputRef.current?.focus();
      }
      toast({
        title: error as string,
        status: "error",
        duration: 3000,
        variant: "left-accent",
        position: "top-right",
      });
    }
  }, [saveTeam, teamName, toast, navigate]);

  const onCancel = useCallback(async () => {
    reloadFromStorage();
    navigate(AppRoute.MY_TEAM);
  }, [navigate, reloadFromStorage]);

  return {
    inputRef,
    onSave,
    onCancel,
    isInvalid,
    isOpen,
    onOpen,
    onDelete,
    onClose,
  };
};
