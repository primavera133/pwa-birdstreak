import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { Footer } from "../Footer";
import { Layout } from "../Layout";
import { LogBird } from "../LogBird";
import { NavBar } from "../NavBar";
import { StartGame } from "../StartGame";

export const PageHome = () => {
  const gameStartDate = useBirdStreakStore((state) => state.gameStartDate);

  return (
    <Layout>
      <NavBar />
      {gameStartDate ? <LogBird /> : <StartGame />}
      <Footer />
    </Layout>
  );
};
