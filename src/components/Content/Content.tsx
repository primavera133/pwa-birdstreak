import { Box } from "@chakra-ui/react";

export const Content = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => (
  <Box className="content" flex="1" p="1rem">
    {children}
  </Box>
);
