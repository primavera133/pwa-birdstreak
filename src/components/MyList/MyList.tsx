import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { Content } from "../Content";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { List } from "../List";
import { NavBar } from "../NavBar";

export const MyList = () => {
  const list = useBirdStreakStore((state) => state.list);
  const hasRehydrated = useBirdStreakStore((state) => state.hasRehydrated);
  let navigate = useNavigate();

  useEffect(() => {
    if (hasRehydrated && list.length === 0) {
      // no list? Go to start page
      navigate("/");
    }
  }, [list, hasRehydrated, navigate]);

  return (
    <Layout>
      <NavBar />
      <Content>
        <Header>Your list</Header>
        <List />
      </Content>
      <Footer />
    </Layout>
  );
};
