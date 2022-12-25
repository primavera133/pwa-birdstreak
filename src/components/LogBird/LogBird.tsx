import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import { format, isBefore } from "date-fns";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
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

  return (
    <Content>
      {noLogsUntilNextPeriod ? (
        <Card m="0 0 2rem" bg="brand.infoBlock">
          <CardBody color="brand.infoBlockText">
            <Heading as="h3" size="lg">
              You have logged {lastItem?.name} for this period.
            </Heading>
            <Box m="1rem 0">
              <img src="/bird2.webp" alt="birdy" width="200rem" />
            </Box>

            <Box>Next period starts {format(deadline, "yyyy-MM-dd")}</Box>
          </CardBody>
        </Card>
      ) : (
        <>
          <Deadline />
          <LogForm />
        </>
      )}
      <Heading as="h3" size="lg" m="0 0 1rem">
        Your list
      </Heading>

      <List />
    </Content>
  );
};
