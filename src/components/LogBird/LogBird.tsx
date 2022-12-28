import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { format, isBefore } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { Content } from "../Content";
import { Deadline } from "../Deadline";
import { List } from "../List";
import { LogForm } from "../LogForm";

export const LogBird = () => {
  const [noLogsUntilNextPeriod, setNoLogsUntilNextPeriod] = useState(false);
  const { checkInterval } = useBirdStreakStore.getState();

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
                <img src={getBirdy()} alt="birdy" width="200rem" />
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
              <img src={getBirdy()} alt="birdy" width="200rem" />
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
          {!isTooLate && (
            <>
              <Deadline />
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
