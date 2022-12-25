import { Box, Button, Text } from "@chakra-ui/react";

import {
  addMilliseconds,
  formatDuration,
  intervalToDuration,
  startOfDay,
} from "date-fns";
import { GAME } from "../../config/game";

import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { Content } from "../Content";
import { Header } from "../Header";

export const StartGame = () => {
  const { streakSpan } = useBirdStreakStore.getState();

  const handleClick = () => {
    const d = new Date();
    const gameStartDate = startOfDay(d);
    const streakSpan = useBirdStreakStore.getState().streakSpan;

    useBirdStreakStore.setState({
      gameStartDate,
      deadline: addMilliseconds(startOfDay(d), streakSpan - 1),
      lastPeriodEnded: gameStartDate,
    });
    // persist total state
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );
  };

  const duration = intervalToDuration({ start: 0, end: streakSpan });
  const formatted = formatDuration(duration, {
    format: ["days"],
  });

  return (
    <Content>
      <Header>Start game</Header>
      <Box m="1rem 0">
        <img src="/bird2.webp" alt="birdy" width="200rem" />
      </Box>
      <Text m="0 0 1rem">
        Welcome to start a streak game. It will start the day you press this
        button. Every period is {formatted}
      </Text>
      <Button colorScheme="blue" onClick={handleClick} size="lg">
        Start a new streak
      </Button>
    </Content>
  );
};
