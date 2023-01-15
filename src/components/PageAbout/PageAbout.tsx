import {
  Box,
  Flex,
  Icon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaBook, FaStar } from "react-icons/fa";
import { Content } from "../Content";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { NavBar } from "../NavBar";

import { useTranslation } from "react-i18next";

export const PageAbout = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <NavBar />
      <Content>
        <Box m="0 0 2rem">
          <Flex align="center">
            <Icon as={FaBook} m="0 .5rem 1rem 0" boxSize="6" />
            <Header>{t("about.rules.header")}</Header>
          </Flex>
          <UnorderedList>
            <ListItem>{t("about.rules.rule1")}</ListItem>
            <ListItem>{t("about.rules.rule2")}</ListItem>
            <ListItem>{t("about.rules.rule3")}</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Flex align="center">
            <Icon as={FaStar} m="0 .5rem 1rem 0" boxSize="6" />
            <Header>{t("about.about.header")}</Header>
          </Flex>
          <Text m="0 0 1rem">
            {t("about.about.text1")}{" "}
            <Text
              as="a"
              textDecoration="underline"
              href="mailto:birdstreak@gmail.com"
            >
              birdstreak@gmail.com
            </Text>{" "}
            {t("about.about.text2")}{" "}
            <Text
              as="a"
              textDecoration="underline"
              href="https://github.com/primavera133/pwa-birdstreak"
              target="_blank"
            >
              Github
            </Text>
          </Text>
          <Text m="0 0 1rem">
            {t("about.birdLogoCredit")}{" "}
            <Text
              as="a"
              textDecoration="underline"
              href="https://www.freepik.com/free-vector/hand-drawn-robin-collection_18895184.htm#query=illustrations%20bird&position=18&from_view=search&track=sph"
            >
              Freepik
            </Text>
          </Text>
        </Box>
        <Box>
          <Flex align="center">
            <Icon as={FaStar} m="0 .5rem 1rem 0" boxSize="6" />
            <Header>{t("about.log.header")}</Header>
          </Flex>

          <Text m="0 0 1rem">
            {t("about.log.current")}: {`${process.env.REACT_APP_VERSION}`}
          </Text>
          <Text m="0 0 1rem">
            0.4.0: Play with different streak periods. Once a day, every second
            day or weekly.
          </Text>
          <Text m="0 0 1rem">
            0.3.1: Nasty little bug fixed, so the game should work again.
          </Text>
          <Text m="0 0 1rem">
            0.3.0: Possile to edit all entries and you get one period after game
            over to cheat your way back into the game again.
          </Text>
        </Box>
      </Content>
      <Footer />
    </Layout>
  );
};
