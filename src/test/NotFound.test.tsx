import React from "react";
import App from "../App";
import { renderWithProviders } from "./utils";
import { screen } from "@testing-library/react";

describe("<Page404 />", () => {
  it("given there is no state stored, renders correctly", () => {
    renderWithProviders(<App />, ["/does-not-exist"]);
    expect(
      screen.getByRole("heading", { name: "Page not found!" })
    ).toBeInTheDocument();
  });
});
