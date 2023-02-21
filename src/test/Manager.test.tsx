import React from "react";
import App from "../App";
import {
  defaultScenario,
  LocalStorageMock,
  renderWithProviders,
  pendingSingular,
} from "./utils";
import { server } from "./utils/setupServer";
import { LOCAL_STORAGE_KEY } from "../providers/my-team/constants";
import { screen, waitFor, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { ApiRoutes } from "../providers/http/ApiFootballClient";
import { AppRoute } from "../enums";

describe("<Manager />", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("given countries request is successful, should show countries links", async () => {
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    await waitFor(() => {
      const nav = screen.getByRole("navigation");
      expect(within(nav).getAllByRole("link")).toHaveLength(4);
    });
  });

  it("given countries request is successful, should be able to filter countries", async () => {
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    let searchInput: HTMLElement;
    await waitFor(() => {
      searchInput = screen.getByRole("textbox", {
        name: "Search countries.",
      });
      expect(searchInput).toBeInTheDocument();
    });
    act(() => {
      userEvent.type(searchInput, "RA");
    });
    const nav = screen.getByRole("navigation");
    expect(within(nav).getAllByRole("link")).toHaveLength(2);
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Clear country search." })
      );
    });
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    act(() => {
      userEvent.type(searchInput, "DOES_NOT_EXIST");
    });
    expect(
      screen.getByText('No results for "DOES_NOT_EXIST" search.')
    ).toBeInTheDocument();
  });

  it("given countries request is loading, should show countries skeleton", async () => {
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    expect(screen.getByTestId("CountryListSkeleton")).toBeInTheDocument();
  });

  it("given countries request results in an error, should display error message", async () => {
    server.use(
      rest.get(ApiRoutes.COUNTRIES, (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: "Internal server error" })
        );
      })
    );
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    await waitFor(() => {
      expect(
        screen.getByText(
          "There has been an error while requesting the participant countries list."
        )
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(screen.getByRole("button", { name: "Try again." }));
    });
    await waitFor(() => {
      const nav = screen.getByRole("navigation");
      expect(within(nav).getAllByRole("link")).toHaveLength(4);
    });
  });

  it("given no country has been selected, shows info alert to select country", async () => {
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Team manager" })
      ).toBeInTheDocument();
    });
    const alert = screen.getByRole("alert");
    expect(
      within(alert).getByText("Select a country to show players list.")
    ).toBeInTheDocument();
  });

  it("when removing team name and saving, should show required error", async () => {
    renderWithProviders(<App />, [AppRoute.MANAGER]);
    await waitFor(() => {
      screen.getByTestId("teamName");
    });
    act(() => {
      userEvent.clear(screen.getByTestId("teamName"));
      userEvent.click(screen.getByRole("button", { name: "Save team" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Team name is required.")).toBeInTheDocument();
    });
  });

  describe("given there is no state stored", () => {
    beforeEach(() => {
      (window.localStorage as LocalStorageMock).removeItem(LOCAL_STORAGE_KEY);
    });

    it("when saving, plural pending errors are displayed", async () => {
      renderWithProviders(<App />, [AppRoute.MANAGER]);
      act(() => {
        userEvent.click(screen.getByRole("button", { name: "Save team" }));
      });
      await waitFor(() => {
        expect(screen.getByText("Coach is required.")).toBeInTheDocument();
      });
      expect(
        screen.getByText("2 pending goalkeepers required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("4 pending defenders required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("4 pending midfielders required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("2 pending attackers required.")
      ).toBeInTheDocument();
    });
  });

  describe("given there is only one pending player for each position in the state", () => {
    beforeEach(() => {
      (window.localStorage as LocalStorageMock).setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(pendingSingular)
      );
    });

    it("when saving, singular pending error is displayed", async () => {
      renderWithProviders(<App />, [AppRoute.MANAGER]);
      act(() => {
        userEvent.click(screen.getByRole("button", { name: "Save team" }));
      });
      await waitFor(() => {
        expect(screen.getByText("Coach is required.")).toBeInTheDocument();
      });
      expect(
        screen.getByText("1 pending goalkeeper required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("1 pending defender required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("1 pending midfielder required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("1 pending attacker required.")
      ).toBeInTheDocument();
    });
  });

  describe("given the default team is stored", () => {
    beforeEach(() => {
      (window.localStorage as LocalStorageMock).setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(defaultScenario)
      );
    });

    it("when deleting team, feedback should be displayed and state removed from storage", async () => {
      renderWithProviders(<App />, [AppRoute.MANAGER]);
      act(() => {
        userEvent.click(screen.getByRole("button", { name: "Delete team" }));
      });
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Confirm delete" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(screen.getByRole("button", { name: "Confirm delete" }));
      });
      await waitFor(() => {
        expect(
          screen.getByText("Team deleted successfully.")
        ).toBeInTheDocument();
      });
      expect(
        (window.localStorage as LocalStorageMock).getItem(LOCAL_STORAGE_KEY)
      ).toBeNull();
    });

    it("when saving team, should redirect to my team page and feedback visible", async () => {
      renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Belgium" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Save team",
          })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByText("Team saved successfully.")
        ).toBeInTheDocument();
      });
    });

    it("when cancelling team update, should redirect to my team page and removed player visible", async () => {
      const { history } = renderWithProviders(<App />, [AppRoute.MANAGER]);
      await waitFor(() => {
        expect(
          screen.getByRole("button", {
            name: "Remove K. Casteels.",
          })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Remove K. Casteels.",
          })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByText("Player removed successfully.")
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Cancel",
          })
        );
      });
      expect(history.location.pathname).toBe(AppRoute.MY_TEAM);
    });
  });
});
