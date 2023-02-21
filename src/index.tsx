import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyTeamProvider } from "./providers";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const FIFTEEN_MIN_IN_MS = 1000 * 60 * 15;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: FIFTEEN_MIN_IN_MS, cacheTime: FIFTEEN_MIN_IN_MS },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <MyTeamProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyTeamProvider>
    </QueryClientProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
