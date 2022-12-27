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

export const PageCredits = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <Box m="0 0 2rem">
          <Flex align="center">
            <Icon as={FaBook} m="0 .5rem 1rem 0" boxSize="6" />
            <Header>Rules</Header>
          </Flex>
          <UnorderedList>
            <ListItem>Log a new bird every period.</ListItem>
            <ListItem>You need to see the bird within the period.</ListItem>
            <ListItem>
              If you haven't seen any new birds when a period comes to it's end,
              you are out.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Flex align="center">
            <Icon as={FaStar} m="0 .5rem 1rem 0" boxSize="6" />
            <Header>Credits</Header>
          </Flex>
          <Text m="0 0 1rem">
            Bird logo and illustrations from{" "}
            <Text
              as="a"
              textDecoration="underline"
              href="https://www.freepik.com/free-vector/hand-drawn-robin-collection_18895184.htm#query=illustrations%20bird&position=18&from_view=search&track=sph"
            >
              Freepik
            </Text>
          </Text>
        </Box>
      </Content>
      <Footer />
    </Layout>
  );
};
