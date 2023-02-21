import React from "react";
import App from "../App";
import {
  LocalStorageMock,
  renderWithProviders,
  defaultScenario,
} from "./utils";
import { LOCAL_STORAGE_KEY } from "../providers/my-team/constants";
import { act, screen, waitFor, within } from "@testing-library/react";
import { AppRoute } from "../enums";
import userEvent from "@testing-library/user-event";

describe("<MyTeam />", () => {
  it("given there is no state stored, should redirect to landing page", async () => {
    (window.localStorage as LocalStorageMock).removeItem(LOCAL_STORAGE_KEY);
    const { history } = renderWithProviders(<App />, [AppRoute.MY_TEAM]);

    await waitFor(() => {
      expect(history.location.pathname).toEqual(AppRoute.LANDING);
    });
  });

  describe("given there is a team stored", () => {
    beforeEach(() => {
      (window.localStorage as LocalStorageMock).setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(defaultScenario)
      );
    });

    it("should render correctly", () => {
      renderWithProviders(<App />, [AppRoute.MY_TEAM]);
      expect(
        screen.getByRole("heading", { name: defaultScenario.name })
      ).toBeInTheDocument();
    });

    it("should be able to swap players", async () => {
      renderWithProviders(<App />, [AppRoute.MY_TEAM]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: defaultScenario.name })
        ).toBeInTheDocument();
      });
      const initialWrapper = screen.getByTestId("initialLineup");
      const substitutesWrapper = screen.getByTestId("substitutes");
      await waitFor(() => {
        expect(
          within(initialWrapper).getByRole("heading", { name: "K. Casteels" })
        ).toBeInTheDocument();
      });
      expect(
        within(substitutesWrapper).getByRole("heading", { name: "T. Courtois" })
      ).toBeInTheDocument();
      act(() => {
        userEvent.click(
          screen.getByRole("button", { name: "Swap K. Casteels position." })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "T. Courtois" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(screen.getByRole("button", { name: "T. Courtois" }));
      });
      await waitFor(() => {
        expect(
          within(initialWrapper).getByRole("heading", {
            name: "T. Courtois",
          })
        ).toBeInTheDocument();
      });
      expect(
        within(substitutesWrapper).getByRole("heading", { name: "K. Casteels" })
      ).toBeInTheDocument();
    });
  });
});
