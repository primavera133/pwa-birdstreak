import { Icon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { FaCog, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => (
  <Flex
    as="footer"
    bg="brand.bg"
    p=".75rem"
    justifyContent="flex-end"
    data-name="footer"
  >
    <Box color="white">
      <Box as={Link} to="/credits" m="0 1rem 0 0">
        <Icon as={FaStar}>credits</Icon>
      </Box>
      <Box as={Link} to="/settings" m="0 1rem 0 0">
        <Icon as={FaCog}>settings</Icon>
      </Box>
    </Box>
  </Flex>
);
