import React from "react";
import { Navigate, Link } from "react-router-dom";

import { useMyTeam } from "../../providers";
import { Box, Heading, Button, Image } from "@chakra-ui/react";
import { AppRoute } from "../../enums";

export const Landing: React.FC = () => {
  const {
    state: { isStored },
  } = useMyTeam();
  if (isStored) {
    return <Navigate to={AppRoute.MY_TEAM} replace />;
  }

  return (
    <>
      <Box as={"main"} padding={"12"}>
        <Box paddingY={20} textAlign={"center"}>
          <Image
            src={"/logo.svg"}
            alt={"Adidas logo"}
            width={"150px"}
            display={"inline-block"}
          />
          <Heading as="h1" size={"xl"} mb={8}>
            My Adidas Team
          </Heading>
          <Button as={Link} to={AppRoute.MANAGER} colorScheme={"blue"}>
            Create my team
          </Button>
        </Box>
      </Box>
    </>
  );
};
