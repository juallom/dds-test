import React from "react";
import App from "../App";
import { act, screen, waitFor, within } from "@testing-library/react";
import {
  defaultScenario,
  LocalStorageMock,
  teamPositionsCount,
  renderWithProviders,
  onePendingGoalkeeper,
  maxLimitOfPlayers,
} from "./utils";
import { LOCAL_STORAGE_KEY } from "../providers/my-team/constants";
import { AppRoute } from "../enums";
import userEvent from "@testing-library/user-event";
import { server } from "./utils/setupServer";
import { rest } from "msw";
import { ApiRoutes } from "../providers/http/ApiFootballClient";

describe("<ManagerPlayersList />", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("given players request is loading, should show players skeleton", async () => {
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(screen.getByTestId("PlayerListSkeleton")).toBeInTheDocument();
    });
  });

  it("should show players list", async () => {
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "I. Serneels" })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: "K. Casteels" })
    ).toBeInTheDocument();
  });

  it("should be able to filter players list", async () => {
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    let searchInput: HTMLElement;
    await waitFor(() => {
      searchInput = screen.getByRole("textbox", {
        name: "Search players.",
      });
      expect(searchInput).toBeInTheDocument();
    });
    act(() => {
      userEvent.type(searchInput, "ee");
    });
    expect(
      screen.getByRole("heading", { name: "I. Serneels" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "K. Casteels" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "T.Courtois" })
    ).not.toBeInTheDocument();
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Clear player search." })
      );
    });
    expect(
      screen.getByRole("heading", { name: "T. Courtois" })
    ).toBeInTheDocument();
    act(() => {
      userEvent.type(searchInput, "DOES_NOT_EXIST");
    });
    expect(
      screen.getByText('No results for "DOES_NOT_EXIST" search.')
    ).toBeInTheDocument();
  });

  it("given players request results in an error, should show feedback error", async () => {
    server.use(
      rest.get(ApiRoutes.PLAYERS, (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: "Internal server error" })
        );
      })
    );
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    expect(
      within(screen.getByRole("alert")).getByText(
        "There has been an error while requesting the players list."
      )
    ).toBeInTheDocument();
  });

  it("given coaches request results in an error, should show feedback error", async () => {
    server.use(
      rest.get(ApiRoutes.COACHES, (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: "Internal server error" })
        );
      })
    );
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    expect(
      within(screen.getByRole("alert")).getByText(
        "There has been an error while requesting the players list."
      )
    ).toBeInTheDocument();
  });

  it("should be able to enroll a coach", async () => {
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Belgium" })
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Enroll I. Serneels." })
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText("Coach enrolled successfully.")
      ).toBeInTheDocument();
    });
  });

  it("should be able to enroll a player", async () => {
    (window.localStorage as LocalStorageMock).removeItem(LOCAL_STORAGE_KEY);
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Belgium" })
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Enroll K. Casteels." })
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText("Player enrolled successfully.")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Remove K. Casteels." })
      ).toBeInTheDocument();
    });
  });

  it("given there are lineup requirement errors being displayed, when resolved this errors should be cleared", async () => {
    (window.localStorage as LocalStorageMock).setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(onePendingGoalkeeper)
    );
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Belgium" })
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(screen.getByRole("button", { name: "Save team" }));
    });
    await waitFor(() => {
      expect(
        screen.getByText("1 pending goalkeeper required.")
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Enroll K. Casteels." })
      );
    });
    await waitFor(() => {
      expect(
        screen.queryByText("1 pending goalkeeper required.")
      ).not.toBeInTheDocument();
    });
  });

  describe("given the default scenario is stored", () => {
    beforeEach(() => {
      (window.localStorage as LocalStorageMock).setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(defaultScenario)
      );
    });

    it("should be able to revoke coach enrollment", async () => {
      renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Belgium" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Revoke enrollment for I. Serneels.",
          })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByText("Coach removed successfully.")
        ).toBeInTheDocument();
      });
    });

    it("should be able to revoke player enrollment", async () => {
      renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Belgium" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Revoke enrollment for K. Casteels.",
          })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByText("Player removed successfully.")
        ).toBeInTheDocument();
      });
    });

    it("should be able to remove player from the lineup section", async () => {
      renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Belgium" })
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
    });

    it("given the max limit of players per country has been reached, when adding player should display error message", async () => {
      renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Belgium" })
        ).toBeInTheDocument();
      });
      act(() => {
        userEvent.click(
          screen.getByRole("button", {
            name: "Enroll A. Theate.",
          })
        );
      });
      await waitFor(() => {
        expect(
          screen.getByText(
            'You have reached the maximum allowed players for "Belgium" team.'
          )
        ).toBeInTheDocument();
      });
    });
  });

  it("given adding a player will make impossible to meet position min count requirement, when enrolling player should show error message", async () => {
    (window.localStorage as LocalStorageMock).setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(teamPositionsCount)
    );
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Belgium" })
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(
        screen.getByRole("button", {
          name: "Enroll K. Casteels.",
        })
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          "You still need to enroll 4 defenders, 4 midfielders and 2 attackers to fulfill team requirements."
        )
      ).toBeInTheDocument();
    });
  });

  it("given limit of max number of players is reached, when enrolling a player should display an error message", async () => {
    (window.localStorage as LocalStorageMock).setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(maxLimitOfPlayers)
    );
    renderWithProviders(<App />, [`${AppRoute.MANAGER}/1`]);
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Enroll K. De Bruyne.",
        })
      ).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(
        screen.getByRole("button", {
          name: "Enroll K. De Bruyne.",
        })
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          "You have reached the maximum allowed players for your team."
        )
      ).toBeInTheDocument();
    });
  });
});
