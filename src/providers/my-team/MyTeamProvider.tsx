import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Coach, Player } from "../../types";
import { myTeamReducer } from "./state/reducer";
import {
  CoachActionType,
  PlayerActionType,
  PlayerPositionActionType,
  TeamUpdateActionType,
} from "./state/actions";
import { DEFAULT_MY_TEAM_STATE, MyTeamContext } from "./constants";
import { createInitialState, canAddPlayer } from "./utils";

export const MyTeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    myTeamReducer,
    DEFAULT_MY_TEAM_STATE,
    createInitialState
  );

  const [canSaveTeam, setCanSaveTeam] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  useEffect(() => {
    const {
      name,
      coach,
      pendingGoalkeepers,
      pendingDefenders,
      pendingMidfielders,
      pendingAttackers,
    } = state;
    const result =
      name.length > 0 &&
      coach !== undefined &&
      pendingGoalkeepers === 0 &&
      pendingDefenders === 0 &&
      pendingMidfielders === 0 &&
      pendingAttackers === 0;
    setCanSaveTeam(result);
    if (showErrors && result) {
      setShowErrors(false);
    }
  }, [state, setCanSaveTeam, showErrors, setShowErrors]);

  const addCoach = (coach: Coach) => {
    dispatch({ type: CoachActionType.ADD_COACH, payload: coach });
  };

  const removeCoach = (coach: Coach) => {
    dispatch({ type: CoachActionType.REMOVE_COACH, payload: coach });
  };

  const addPlayer = useCallback(
    async (player: Player) => {
      try {
        await canAddPlayer(player, state);
        dispatch({ type: PlayerActionType.ADD_PLAYER, payload: player });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [state]
  );

  const removePlayer = (player: Player) => {
    dispatch({ type: PlayerActionType.REMOVE_PLAYER, payload: player });
  };

  const swapPlayers = (from: Player, to: Player) => {
    dispatch({
      type: PlayerPositionActionType.SWAP_PLAYERS_POSITION,
      payload: { from, to },
    });
  };

  const saveTeam = useCallback(() => {
    if (canSaveTeam) {
      dispatch({ type: TeamUpdateActionType.SAVE_TEAM });
      return Promise.resolve();
    } else {
      setShowErrors(true);
      return Promise.reject(
        "Your team does not fulfill team requirements, please review errors."
      );
    }
  }, [canSaveTeam]);

  const deleteTeam = () => {
    setShowErrors(false);
    dispatch({ type: TeamUpdateActionType.DELETE_TEAM });
  };

  const changeName = (name: string) => {
    dispatch({ type: TeamUpdateActionType.CHANGE_NAME, payload: name });
  };

  const reloadFromStorage = () => {
    dispatch({ type: TeamUpdateActionType.RELOAD_STORED });
  };

  return (
    <MyTeamContext.Provider
      value={{
        state,
        showErrors,
        addCoach,
        removeCoach,
        addPlayer,
        removePlayer,
        swapPlayers,
        saveTeam,
        deleteTeam,
        changeName,
        reloadFromStorage,
      }}
    >
      {children}
    </MyTeamContext.Provider>
  );
};
