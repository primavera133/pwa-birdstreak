import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GAME } from "../../config/game";
import {
  initialState,
  useBirdStreakStore,
} from "../../hooks/useBirdStreakStore";
import { ListItem } from "../../types";
import { Content } from "../Content";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { NavBar } from "../NavBar";

import { FaExclamationTriangle, FaFileExport } from "react-icons/fa";

export const PageSettings = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteGame = () => {
    const legacyGames = localStorage.getItem(GAME.legacyGamesKey);
    if (legacyGames) {
      const g = JSON.parse(legacyGames);
      g.push(useBirdStreakStore.getState());
      localStorage.setItem(GAME.legacyGamesKey, JSON.stringify(g));
    } else {
      localStorage.setItem(
        GAME.legacyGamesKey,
        JSON.stringify([useBirdStreakStore.getState()])
      );
    }
    localStorage.removeItem(GAME.persistKey);
    useBirdStreakStore.setState(initialState);

    navigate("/");
  };

  const handleClick = () => {
    onOpen();
  };

  const handleExport = () => {
    function convertToCSV(arr: ListItem[]) {
      const array = [Object.keys(arr[0]), ...arr];

      return array
        .map((it) => {
          return Object.values(it).toString();
        })
        .join("\n");
    }

    const state = useBirdStreakStore.getState();
    const csvData = convertToCSV(state.list);
    var link = document.createElement("a");
    var file = new Blob([csvData], {
      type: "text/csv;charset=utf-8;",
    });
    link.href = URL.createObjectURL(file);
    link.download = "birdStreak.csv";
    link.click();
  };

  const handleDataDump = () => {
    const state = useBirdStreakStore.getState();
    var link = document.createElement("a");
    var file = new Blob([JSON.stringify(state)], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "birdStreakDataDump.json";
    link.click();
  };

  return (
    <Layout>
      <NavBar />
      <Content>
        <Header>Settings</Header>
        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaFileExport} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                Export
              </Heading>
            </Flex>
            <Text m="0 0 1rem">Export the streak to CSV format</Text>
            <Button onClick={handleExport}>Export streak</Button>
          </CardBody>
        </Card>
        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaFileExport} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                Data dump
              </Heading>
            </Flex>

            <Text m="0 0 1rem">
              Complete data-dump. Good for debugging if you want to complain to
              the make of this app.
            </Text>
            <Button onClick={handleDataDump}>Dump data</Button>
          </CardBody>
        </Card>

        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaExclamationTriangle} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                Delete game
              </Heading>
            </Flex>

            <Text m="0 0 1rem">
              You can delete the current game if you want to restart.
            </Text>
            <Button onClick={handleClick}>Delete game</Button>
          </CardBody>
        </Card>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete game
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteGame} ml={3}>
                  Delete game
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Content>
      <Footer />
    </Layout>
  );
};
