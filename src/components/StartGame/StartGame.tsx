import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";

import {
  formatDuration,
  intervalToDuration,
  startOfDay,
  startOfYear,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { GAME } from "../../config/game";

import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FaCrow } from "react-icons/fa";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBackfill } from "../../logic/getBackfill";
import { Content } from "../Content";
import { Header } from "../Header";
import { RadioCard } from "../RadioCard";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const StartGame = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [streakSpan, setStreakSpan] = useState(2 * ONE_DAY_IN_MILLISECONDS);

  const streakSpanOptions = [
    { value: "1day", text: "Once a day" },
    { value: "2days", text: "Every second day" },
    { value: "weekly", text: "Weekly" },
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "streakspan",
    defaultValue: "2days",
    onChange: (value) => {
      switch (value) {
        case "1day":
          setStreakSpan(1 * ONE_DAY_IN_MILLISECONDS);
          break;
        case "2days":
          setStreakSpan(2 * ONE_DAY_IN_MILLISECONDS);
          break;
        case "weekly":
          setStreakSpan(7 * ONE_DAY_IN_MILLISECONDS);
          break;
      }
    },
  });

  const streakSpanGroup = getRootProps();

  const handleClick = () => {
    const gameStartDate = startOfDay(startDate);

    const periods = getBackfill(startDate, new Date(), streakSpan);

    const currentPeriod = periods.pop();

    if (!currentPeriod) {
      throw new Error("wtf");
    }
    const lastItem = periods.length ? periods[periods.length - 1] : undefined;

    useBirdStreakStore.setState({
      gameStartDate,
      periodStart: currentPeriod.periodStart,
      deadline: currentPeriod.periodEnd,
      lastPeriodEnded: periods.length
        ? periods[periods.length - 1].periodEnd
        : gameStartDate,
      list: periods,
      lastItem,
      streakSpan,
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
      <Box m="0 0 1rem">
        <Box as="label" htmlFor="myDdatePicker">
          <Text as="span" fontWeight="bold" fontSize="xl">
            Start date
          </Text>
        </Box>
        <Box m="0 0 .25rem 0">
          <SingleDatepicker
            data-x="x"
            id="myDdatePicker"
            name="date-input"
            date={startDate}
            maxDate={new Date()}
            minDate={
              startOfYear(new Date()) < subMonths(new Date(), 1)
                ? startOfYear(new Date())
                : subMonths(new Date(), 1)
            }
            onDateChange={setStartDate}
            configs={{
              firstDayOfWeek: 1,
            }}
          />
        </Box>
        <Flex align="center">
          <Icon as={FaCrow} m="0 .25rem 0" />
          <Text as="span">
            You can start the game on today or a previous date (and backfill
            your sightings).
          </Text>
        </Flex>
      </Box>

      <Box m="0 0 1rem">
        <Box m="0 0 .5rem">
          <Text as="span" fontWeight="bold" fontSize="xl">
            Frequency
          </Text>
        </Box>

        <HStack {...streakSpanGroup}>
          {streakSpanOptions.map((option) => {
            const radio = getRadioProps({
              value: option.value,
            });
            return (
              <RadioCard key={option.value} {...radio}>
                {option.text}
              </RadioCard>
            );
          })}
        </HStack>
        <Flex align="center">
          <Icon as={FaCrow} m="0 .25rem 0" />
          <Text as="span">Select how often you want to report.</Text>
        </Flex>
      </Box>

      <Button colorScheme="blue" onClick={handleClick} size="lg">
        Start a new streak
      </Button>
    </Content>
  );
};
