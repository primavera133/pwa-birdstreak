import { useNavigate } from "react-router-dom";
import { GAME } from "../../config/game";
import {
  initialState,
  useBirdStreakStore,
} from "../../hooks/useBirdStreakStore";
import { Content } from "../Content";
import { Footer } from "../Footer";
import { Layout } from "../Layout";
import { NavBar } from "../NavBar";

export const Settings = () => {
  const navigate = useNavigate();
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
  };
  const handleClick = () => {
    deleteGame();
    navigate("/");
  };
  return (
    <Layout>
      <NavBar />
      <Content>
        <h2>Settings</h2>

        <button onClick={handleClick}>Delete game</button>
      </Content>
      <Footer />
    </Layout>
  );
};
