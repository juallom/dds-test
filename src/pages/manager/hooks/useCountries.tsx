import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { ApiFootballClient } from "../../../providers/http/ApiFootballClient";
import { Country } from "../../../types";

type UseCountriesReturn = {
  countries?: Country[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: UseQueryResult["refetch"];
  setFilterValue: Dispatch<SetStateAction<string>>;
  filterValue: string;
};

export const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[] | undefined>(undefined);
  const [filterValue, setFilterValue] = useState<string>("");
  const {
    data: countriesData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(["getCountries"], () => {
    return ApiFootballClient.getCountries();
  });

  useEffect(() => {
    if (countriesData) {
      if (filterValue) {
        const regex = new RegExp(filterValue, "ig");
        setCountries(
          countriesData.filter((country) => country.name.match(regex))
        );
      } else {
        setCountries(countriesData);
      }
    }
  }, [countriesData, filterValue, setCountries]);

  return {
    countries,
    isLoading,
    isSuccess,
    isError,
    refetch,
    setFilterValue,
    filterValue,
  };
};
