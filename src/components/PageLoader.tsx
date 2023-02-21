import React from "react";
import { Box, CircularProgress, Text } from "@chakra-ui/react";

export type LoaderProps = {
  label: string;
};

export const PageLoader: React.FC<LoaderProps> = ({ label }) => {
  return (
    <>
      <Box p={20} textAlign={"center"}>
        <CircularProgress isIndeterminate size={"120px"} thickness={4} />
        <Text mt={3}>{label}</Text>
      </Box>
    </>
  );
};
