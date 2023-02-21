import styled from "@emotion/styled";

export const Page = styled.div`
  position: relative;
  overflow: hidden;
  max-height: 100vh;
  height: 100vh;
`;
export const Header = styled.header`
  padding: var(--chakra-space-3) var(--chakra-space-5);
  background-color: var(--chakra-colors-blackAlpha-900);
  color: var(--chakra-colors-gray-50);
  height: 68px;
  border: 0;
`;
export const Body = styled.div`
  height: calc(100% - 136px);
  max-height: calc(100% - 136px);
  border: 0;
  overflow: hidden;
`;
export const Footer = styled.footer`
  padding: var(--chakra-space-3) var(--chakra-space-5);
  height: 65px;
  border-top: 2px solid var(--chakra-colors-gray-100);
`;
