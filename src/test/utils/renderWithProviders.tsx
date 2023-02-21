import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { createMemoryHistory } from "history";
import { ChakraProvider } from "@chakra-ui/react";
import { MyTeamProvider } from "../../providers";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

export const renderWithProviders = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
  const history = createMemoryHistory({ initialEntries });
  const wrapper = (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MyTeamProvider>
          <Router location={history.location} navigator={history}>
            {component}
          </Router>
        </MyTeamProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
  const { rerender, ...renderResult } = render(wrapper);
  return {
    history,
    ...renderResult,
    rerender: () => rerender(wrapper),
  };
};
