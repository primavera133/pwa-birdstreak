import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const navigate = useNavigate();

  const { t } = useTranslation();

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
        <Header>{t("myList.header")}</Header>
        <List />
      </Content>
      <Footer />
    </Layout>
  );
};
