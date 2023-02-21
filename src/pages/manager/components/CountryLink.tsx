import React from "react";
import { NavLink } from "react-router-dom";
import { Text, Image, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";

const ActiveNavLink = styled(NavLink)`
  &.active {
    font-weight: bolder;
    background-color: var(--chakra-colors-gray-200);
  }
  &:hover:not(.active) {
    background-color: var(--chakra-colors-gray-100);
  }
`

export type CountryLinkProps = {
  label: string;
  photoUrl: string;
  to: string;
};

export const CountryLink: React.FC<CountryLinkProps> = ({
  label,
  photoUrl,
  to,
}) => {
  return (
    <Stack
      as={ActiveNavLink}
      to={to}
      direction={"row"}
      alignItems={"center"}
      spacing={4}
      px={3}
      py={3}
      transition={"background-color .3s ease-in-out"}
    >
      {/* In this context the country flag image is identified and described by surrounding text. */}
      {/* Setting alt attribute to an empty string will prevent accessibility tools to announce the image src url. */}
      <Image
        src={photoUrl}
        alt={""}
        height={"30px"}
        width={"45px"}
        borderWidth={1}
        borderStyle={"solid"}
      />
      <Text>{label}</Text>
    </Stack>
  );
};
