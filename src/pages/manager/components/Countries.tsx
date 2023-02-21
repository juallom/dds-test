import React from "react";
import { Box, Heading, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { RequestFailed, Search } from "../../../components";
import { useCountries } from "../hooks/useCountries";
import { CountryListSkeleton } from "./CountryListSkeleton";
import { CountryLink } from "./CountryLink";

export const Countries: React.FC = () => {
  const {
    countries,
    isLoading,
    isSuccess,
    isError,
    refetch,
    setFilterValue,
    filterValue,
  } = useCountries();
  return (
    <>
      <Heading as={"h2"} size={"lg"} mb={3}>
        Countries
      </Heading>
      {isLoading && <CountryListSkeleton />}
      {isError && (
        <RequestFailed refetch={refetch}>
          <>
            There has been an error while requesting the participant countries
            list.
          </>
        </RequestFailed>
      )}
      {isSuccess && (
        <>
          <Search
            label={"Search countries."}
            clearTextLabel={"Clear country search."}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
          <Box as={"nav"}>
            {countries?.map(({ name, id, logo }) => {
              return (
                <CountryLink
                  key={id}
                  label={name}
                  to={`${id}`}
                  photoUrl={logo}
                />
              );
            })}
          </Box>
          {countries?.length === 0 && (
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
