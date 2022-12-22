import { Content } from "../Content";
import { Footer } from "../Footer";
import { Layout } from "../Layout";
import { List } from "../List";
import { NavBar } from "../NavBar";

export const MyList = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <h2>My list</h2>
        <List />
      </Content>
      <Footer />
    </Layout>
  );
};
