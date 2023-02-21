import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Button, Image } from "@chakra-ui/react";
import { AppRoute } from "../enums";

export const Page404: React.FC = () => {
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
            Page not found!
          </Heading>
          <Button as={Link} to={AppRoute.LANDING} colorScheme={"blue"}>
            Back to My Adidas Team
          </Button>
        </Box>
      </Box>
    </>
  );
};
