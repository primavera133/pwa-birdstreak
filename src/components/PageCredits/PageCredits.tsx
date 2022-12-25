import { Box, Text } from "@chakra-ui/react";
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
        <Box>
          <Header>Credits</Header>
          <Text m="0 0 1rem">
            Logo from{" "}
            <Text
              as="a"
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
