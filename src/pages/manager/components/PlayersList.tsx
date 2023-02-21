import React from "react";
import { usePlayersList } from "../hooks/usePlayersList";
import {
  Alert,
  AlertIcon,
  Text,
  List,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import { Search, RequestFailed } from "../../../components";
import { PlayerListSkeleton } from "./PlayerListSkeleton";
import { PlayerCard } from "./PlayerCard";

export const PlayersList: React.FC = () => {
  const {
    team,
    isLoading,
    isSuccess,
    isError,
    refetch,
    setFilterValue,
    filterValue,
  } = usePlayersList();
  return (
    <>
      {isLoading && <PlayerListSkeleton />}
      {isError && (
        <RequestFailed refetch={refetch}>
          <>There has been an error while requesting the players list.</>
        </RequestFailed>
      )}
      {isSuccess && (
        <>
          <Heading as={"h2"} size={"lg"} mb={3}>
            {team?.name}
          </Heading>
          <Search
            label={"Search players."}
            clearTextLabel={"Clear player search."}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
          <List>
            {team?.coach && (
              <ListItem key={"coach"} mb={4}>
                <PlayerCard player={team?.coach} />
              </ListItem>
            )}
            {team?.players.map((player) => {
              return (
                <ListItem key={player.id} mb={4}>
                  <PlayerCard player={player} />
                </ListItem>
              );
            })}
          </List>
          {team?.coach === undefined && team?.players.length === 0 && (
            <Alert status="info">
              <AlertIcon />
              <Text>No results for "{filterValue}" search.</Text>
            </Alert>
          )}
        </>
      )}
    </>
  );
};
