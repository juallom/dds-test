import React, { ReactElement } from "react";
import { Alert, AlertIcon, Button, Text } from "@chakra-ui/react";
import { UseQueryResult } from "react-query";

type RequestFailedProps = {
  children: ReactElement;
  refetch: UseQueryResult["refetch"];
};

export const RequestFailed: React.FC<RequestFailedProps> = ({
  children,
  refetch,
}) => (
  <Alert status="error">
    <AlertIcon />
    <Text>
      {children}{" "}
      <Button variant={"link"} onClick={() => refetch()}>
        Try again.
      </Button>
    </Text>
  </Alert>
);
