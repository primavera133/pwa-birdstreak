import { Link } from "react-router-dom";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";

import { Icon } from "@chakra-ui/icons";
import { FaListAlt, FaPlusSquare } from "react-icons/fa";

import { Box, Flex, Heading } from "@chakra-ui/react";
export const NavBar = () => {
  const gameStartDate = useBirdStreakStore((state) => state.gameStartDate);
  const list = useBirdStreakStore((state) => state.list);

  return (
    <Flex justify="space-between" bg="brand.bg" p=".75rem" data-name="navbar">
      <Flex align="center" data-name="title">
        <Link to="/">
          <img src="logo.png" width={32} height={32} alt="logo" />
        </Link>
        <Link to="/">
          <Heading as="h1" m="0 1rem" size="xl" color="white">
            Birdstreak
          </Heading>
        </Link>
      </Flex>
      <Flex align="center">
        {gameStartDate && (
          <>
            <Box
              as={Link}
              to="/"
              color="white"
              textDecoration="none"
              fontWeight="bold"
            >
              <Icon as={FaPlusSquare} boxSize={6} m="0 1rem 0 0" />
            </Box>
            {list.length > 0 && (
              <Box
                as={Link}
                to="/list"
                color="white"
                textDecoration="none"
                fontWeight="bold"
              >
                <Icon as={FaListAlt} boxSize={6} m="0 1rem 0 0" />
              </Box>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};
