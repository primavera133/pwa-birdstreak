import { Flex } from "@chakra-ui/react";

export const Layout = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => (
  <Flex flexDirection={"column"} data-name="layout" h="calc(100vh)">
    {children}
  </Flex>
);
