import { setupServer } from "msw/node";
import { rest } from "msw";
import { ApiRoutes } from "../../providers/http/ApiFootballClient";

import countries from "./fixtures/countries.json";
import team1 from "./fixtures/team1.json";
import team2 from "./fixtures/team2.json";
import team3 from "./fixtures/team3.json";
import team6 from "./fixtures/team6.json";
import coach1 from "./fixtures/coach1.json";
import coach2 from "./fixtures/coach2.json";
import coach3 from "./fixtures/coach3.json";
import coach6 from "./fixtures/coach6.json";

export const server = setupServer(
  rest.get(ApiRoutes.COUNTRIES, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countries));
  }),
  rest.get(ApiRoutes.PLAYERS, (req, res, ctx) => {
    const team = req.url.searchParams.get('team');
    let response;
    switch (team) {
      case "1":
        response = team1;
        break;
      case "2":
        response = team2;
        break;
      case "3":
        response = team3;
        break;
      case "6":
      default:
        response = team6;
    }
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get(ApiRoutes.COACHES, (req, res, ctx) => {
    const team = req.url.searchParams.get('team');
    let response;
    switch (team) {
      case "1":
        response = coach1;
        break;
      case "2":
        response = coach2;
        break;
      case "3":
        response = coach3;
        break;
      case "6":
      default:
        response = coach6;
    }
    return res(ctx.status(200), ctx.json(response));
  })
);
