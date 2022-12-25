import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GAME } from "../../config/game";
import {
  initialState,
  useBirdStreakStore,
} from "../../hooks/useBirdStreakStore";
import { Content } from "../Content";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { NavBar } from "../NavBar";

export const PageSettings = () => {
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
        <Header>Settings</Header>
        <Text m="0 0 1rem">
          You can delete the current game if you want to restart.
        </Text>
        <Button onClick={handleClick}>Delete game</Button>
      </Content>
      <Footer />
    </Layout>
  );
};
