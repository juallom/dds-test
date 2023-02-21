import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import { Landing } from "./pages/landing";
import { AppRoute } from "./enums";
import { PageLoader } from "./components";
import { PlayersList } from "./pages/manager/components/PlayersList";
import { Page404 } from "./components/Page404";

const Manager = lazy(() => import("./pages/manager/Manager"));
const MyTeam = lazy(() => import("./pages/my-team/MyTeam"));

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.LANDING} element={<Landing />} />
        <Route
          path={AppRoute.MANAGER}
          element={
            <Suspense fallback={<PageLoader label={"Loading manager."} />}>
              <Manager />
            </Suspense>
          }
        >
          <Route path={AppRoute.MANAGER_COUNTRY} element={<PlayersList />} />
          <Route
            path={""}
            element={
              <>
                <Alert status="info">
                  <AlertIcon />
                  <Text>Select a country to show players list.</Text>
                </Alert>
              </>
            }
          />
        </Route>
        <Route
          path={AppRoute.MY_TEAM}
          element={
            <Suspense fallback={<PageLoader label={"Loading my team."} />}>
              <MyTeam />
            </Suspense>
          }
        />
        <Route path={"*"} element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
