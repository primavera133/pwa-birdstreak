import { Heading } from "@chakra-ui/react";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <Heading m="0 0 1rem">{children}</Heading>;
};
