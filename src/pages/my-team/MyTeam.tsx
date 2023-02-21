import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Box, Heading, Stack, Button } from "@chakra-ui/react";
import { useMyTeam } from "../../providers";
import { AppRoute } from "../../enums";
import { MyCoach } from "./components/MyCoach";
import { MyInitialLineup } from "./components/MyInitialLineup";
import { MySubstitutes } from "./components/MySubstitutes";
import { Page, Header, Body, Footer } from "../../components";

const MyTeam: React.FC = () => {
  const {
    state: { name, isStored },
  } = useMyTeam();

  if (!isStored) {
    return <Navigate to={AppRoute.LANDING} replace />;
  }

  return (
    <>
      <Page>
        <Header>
          <Heading as="h1" size={"xl"}>
            {name}
          </Heading>
        </Header>
        <Body>
          <Box p={5} height={"100%"} overflowY={"scroll"}>
            <Stack
              direction={"row"}
              spacing={5}
              alignItems={"flex-start"}
            >
              <Box
                borderWidth={2}
                borderRadius={4}
                borderColor={"gray.100"}
                flexBasis={"65%"}
                p={5}
                as={"main"}
                data-testid={"initialLineup"}
              >
                <MyInitialLineup />
              </Box>
              <Stack
                direction={"column"}
                spacing={5}
                alignItems={"stretch"}
                flexBasis={"35%"}
                as={"aside"}
              >
                <Box
                  borderWidth={2}
                  borderRadius={4}
                  borderColor={"gray.100"}
                  flexBasis={"45%"}
                  p={5}
                >
                  <MyCoach />
                </Box>
                <Box
                  borderWidth={2}
                  borderRadius={4}
                  borderColor={"gray.100"}
                  flexBasis={"45%"}
                  p={5}
                  data-testid={"substitutes"}
                >
                  <MySubstitutes />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Body>
        <Footer>
          <Box textAlign={"right"}>
            <Button as={Link} to={AppRoute.MANAGER} colorScheme={"blue"}>
              Manage team
            </Button>
          </Box>
        </Footer>
      </Page>
    </>
  );
};

export default MyTeam;
