import React from "react";
import App from "../App";
import {
  LocalStorageMock,
  renderWithProviders,
  defaultScenario,
} from "./utils";
import { LOCAL_STORAGE_KEY } from "../providers/my-team/constants";
import { screen } from "@testing-library/react";
import { AppRoute } from "../enums";

describe("<Landing />", () => {
  it("given there is no state stored, renders correctly", () => {
    (window.localStorage as LocalStorageMock).removeItem(LOCAL_STORAGE_KEY);
    const { history } = renderWithProviders(<App />, [AppRoute.LANDING]);
    expect(
        screen.getByRole("heading", { name: "My Adidas Team" })
    ).toBeInTheDocument();
    expect(history.location.pathname).toEqual(AppRoute.LANDING);
  });

  it("given there is a team stored, redirects to my team page", () => {
    (window.localStorage as LocalStorageMock).setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(defaultScenario)
    );
    const { history } = renderWithProviders(<App />, [AppRoute.LANDING]);
    expect(
        screen.queryByRole("heading", { name: "Landing page: My Adidas Team" })
    ).not.toBeInTheDocument();
    expect(history.location.pathname).toEqual(AppRoute.MY_TEAM);
  });
});
