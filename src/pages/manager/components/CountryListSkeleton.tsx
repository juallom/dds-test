import React from "react";
import {
  Box,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

export const CountryListSkeleton: React.FC = () => {
  return (
    <Box data-testid={"CountryListSkeleton"}>
      <Skeleton height={"40px"} mb={"20px"} />
      <Box>
        {Array.from(Array(14).keys()).map((item, index) => (
          <Stack
            key={`playerSkeleton${index}`}
            direction={"row"}
            alignItems={"center"}
            spacing={4}
            px={3}
            py={3}
          >
            <Skeleton width={"45px"} height={"30px"} />
            <Skeleton width={"80px"} height={"16px"} />
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
