import {
  Box,
  Card,
  CardBody,
  Heading,
  List as ListComponent,
  ListIcon,
  ListItem as ListItemComponent,
  Text,
} from "@chakra-ui/react";
import { addMilliseconds, format, isBefore } from "date-fns";
import { useState } from "react";
import { FaCrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { Content } from "../Content";
import { Deadline } from "../Deadline";
import { Header } from "../Header";
import { List } from "../List";
import { LogForm } from "../LogForm";

export const LogBird = () => {
  const [noLogsUntilNextPeriod, setNoLogsUntilNextPeriod] = useState(false);
  const { checkInterval, gameStartDate, streakSpan } =
    useBirdStreakStore.getState();

  const [birdy] = useState(getBirdy());

  const lastPeriodEnded = useBirdStreakStore((state) => state.lastPeriodEnded);
  const lastItem = useBirdStreakStore((state) => state.lastItem);
  const deadline = useBirdStreakStore((state) => state.deadline);
  const nextPeriodStarts = useBirdStreakStore(
    (state) => state.nextPeriodStarts
  );

  const checkNoLogsUntilNextPeriod = () => {
    if (!lastPeriodEnded) return;
    const value = isBefore(new Date(), lastPeriodEnded);
    if (value !== noLogsUntilNextPeriod) {
      setNoLogsUntilNextPeriod(value);
    }
  };

  checkNoLogsUntilNextPeriod();
  // recheck disabled state on regular intervals, since it depends on time
  useInterval(() => {
    checkNoLogsUntilNextPeriod();
  }, checkInterval);

  if (!deadline) return null;

  const periodStart = lastItem ? lastItem.periodEnd : gameStartDate;
  const periodEnd = periodStart
    ? addMilliseconds(periodStart, streakSpan - 1)
    : null;

  const isTooLate = isBefore(deadline, new Date());

  return (
    <Content>
      <>
        {isTooLate && (
          <Card m="0 0 2rem" bg="brand.urgent">
            <CardBody color="brand.urgentText">
              <Heading as="h3" size="lg">
                Game over!
              </Heading>
              <Box m="1rem 0">
                <img src={birdy} alt="birdy" width="200rem" />
              </Box>
              <Box>You missed to log a new bird in your last period.</Box>
              <Box>
                Go to{" "}
                <Text as={Link} to="/settings" textDecor="underline">
                  Settings
                </Text>{" "}
                to reset the game if you want to start a new one.
              </Box>
            </CardBody>
          </Card>
        )}
      </>
      {noLogsUntilNextPeriod ? (
        <Card m="0 0 2rem" bg="brand.infoBlock">
          <CardBody color="brand.infoBlockText">
            <Heading as="h3" size="lg">
              You have logged {lastItem?.name} for this period.
            </Heading>
            <Box m="1rem 0">
              <img src={birdy} alt="birdy" width="200rem" />
            </Box>

            {nextPeriodStarts && (
              <Box data-testid="next-period">
                Next period starts {format(nextPeriodStarts, "d/M")}
              </Box>
            )}
          </CardBody>
        </Card>
      ) : (
        <>
          {!isTooLate && !!periodStart && !!periodEnd && (
            <>
              <Deadline />
              <Header>Log your next bird</Header>
              <Box m="1rem 0">
                <img src={birdy} alt="birdy" width="200rem" />
              </Box>

              <ListComponent m="1rem" p="0">
                <ListItemComponent>
                  <ListIcon as={FaCrow} key="1" />
                  This period spans from {format(periodStart, "d/M")} to{" "}
                  {format(periodEnd, "d/M")}.
                </ListItemComponent>
                <ListItemComponent>
                  <ListIcon as={FaCrow} key="2" />
                  When you have locked in on a bird you cannot add a new one
                  until next period starts.
                </ListItemComponent>
                <ListItemComponent>
                  <ListIcon as={FaCrow} key="3" />
                  Log next bird before end of {format(periodEnd, "d/M")}
                </ListItemComponent>
              </ListComponent>

              <LogForm />
            </>
          )}
        </>
      )}
      <>
        {lastItem ? (
          <>
            <Heading as="h3" size="lg" m="0 0 1rem">
              Your list
            </Heading>
            <List />
          </>
        ) : null}
      </>
    </Content>
  );
};
