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

import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import {
  FaCog,
  FaExclamationTriangle,
  FaFileExport,
  FaGlobeAfrica,
} from "react-icons/fa";

export const PageSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <Flex align="center">
          <Icon as={FaCog} m="0 .5rem 1rem 0" boxSize="6" />
          <Header>{t("settings.header")}</Header>
        </Flex>
        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaGlobeAfrica} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                {t("settings.selectLangage")}
              </Heading>
            </Flex>
            <Button m="0 1rem 0 0" onClick={() => changeLanguage("en")}>
              {t("settings.languageEn")}
            </Button>
            <Button m="0 1rem 0 0" onClick={() => changeLanguage("sv")}>
              {t("settings.languageSv")}
            </Button>
          </CardBody>
        </Card>
        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaFileExport} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                {t("settings.export")}
              </Heading>
            </Flex>
            <Text m="0 0 1rem">{t("settings.exportHint")}</Text>
            <Button onClick={handleExport}>{t("settings.exportBtn")}</Button>
          </CardBody>
        </Card>
        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaFileExport} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                {t("settings.dataDump")}
              </Heading>
            </Flex>

            <Text m="0 0 1rem">{t("settings.dataDumpHint")}</Text>
            <Button onClick={handleDataDump}>
              {t("settings.dataDumpBtn")}
            </Button>
          </CardBody>
        </Card>

        <Card m="0 0 1rem">
          <CardBody>
            <Flex align="center" m="0 0 1rem">
              <Icon as={FaExclamationTriangle} m="0 .5rem 0 0 " />
              <Heading as="h3" size="md">
                {t("settings.deleteGame")}
              </Heading>
            </Flex>

            <Text m="0 0 1rem">{t("settings.deleteGameHint")}</Text>
            <Button onClick={handleClick}>{t("settings.deleteGameBtn")}</Button>
          </CardBody>
        </Card>

        <Text>
          {t("settings.appVersion")}: {`${process.env.REACT_APP_VERSION}`}
        </Text>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {t("settings.alertHeader")}
              </AlertDialogHeader>

              <AlertDialogBody>{t("settings.alertBody")}</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  {t("settings.alertBtnCancel")}
                </Button>
                <Button colorScheme="red" onClick={deleteGame} ml={3}>
                  {t("settings.alertBtnDelete")}
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
