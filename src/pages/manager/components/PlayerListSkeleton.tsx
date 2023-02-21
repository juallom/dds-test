import React from "react";
import { Box, Stack, Skeleton, Flex, Spacer } from "@chakra-ui/react";

export const PlayerListSkeleton: React.FC = () => {
  return (
    <Box data-testid={"PlayerListSkeleton"}>
      <Skeleton height={"36px"} width={"80px"} mb={3} />
      <Skeleton height={"40px"} width={"100%"} mb={3} />
      <Box>
        {Array.from(Array(8).keys()).map((item, index) => (
          <Box key={`countrySkeleton${index}`} mb={3}>
            <Flex direction={"row"} alignItems={"flex-end"}>
              <Skeleton width={"150px"} height={"150px"} />
              <Box flexGrow={1} p={3}>
                <Box mb={2}>
                  <Stack spacing={3} direction={"row"} alignItems={"center"}>
                    <Skeleton width={"30px"} height={"20px"} />
                    <Skeleton width={"120px"} height={"20px"} />
                  </Stack>
                </Box>
                <Flex alignItems={"flex-end"}>
                  <Box>
                    <Skeleton width={"60px"} height={"16px"} />
                    <Skeleton width={"85px"} height={"20px"} mt={2} />
                  </Box>
                  <Spacer />
                  <Skeleton width={"75px"} height={"40px"} mt={2} />
                </Flex>
              </Box>
            </Flex>
            <Skeleton width={"100%"} height={"3px"} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
