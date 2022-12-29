import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  List as ListComponent,
  ListIcon,
  ListItem as ListItemComponent,
  Text,
} from "@chakra-ui/react";
import { format, isBefore } from "date-fns";
import { useState } from "react";
import { FaCrow, FaExclamation } from "react-icons/fa";
import { useInterval } from "usehooks-ts";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { Content } from "../Content";
import { Deadline } from "../Deadline";
import { Header } from "../Header";
import { List } from "../List";
import { LogForm } from "../LogForm";
import { TooLate } from "../TooLate";

export const LogBird = () => {
  const [noLogsUntilNextPeriod, setNoLogsUntilNextPeriod] = useState(false);
  const { checkInterval } = useBirdStreakStore.getState();

  const birdy = getBirdy();

  const lastPeriodEnded = useBirdStreakStore((state) => state.lastPeriodEnded);
  const lastItem = useBirdStreakStore((state) => state.lastItem);
  const deadline = useBirdStreakStore((state) => state.deadline);
  const periodStart = useBirdStreakStore((state) => state.periodStart);
  const list = useBirdStreakStore((state) => state.list);
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

  const hasUnNamedPeriods = list.filter((item) => !item.isNamed).length;

  return (
    <Content>
      <>{isTooLate && <TooLate />}</>
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
              <>
                <Text data-testid="next-period">
                  Next period starts {format(nextPeriodStarts, "d/M")}
                </Text>
                {!!hasUnNamedPeriods && (
                  <Flex align="center">
                    <Icon as={FaExclamation} />
                    <Text>
                      You still have {hasUnNamedPeriods} older periods to log!
                    </Text>
                  </Flex>
                )}
              </>
            )}
          </CardBody>
        </Card>
      ) : (
        <>
          {!isTooLate && !!periodStart && (
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
                  {format(deadline, "d/M")}.
                </ListItemComponent>
                <ListItemComponent>
                  <ListIcon as={FaCrow} key="2" />
                  When you have locked in on a bird you cannot add a new one
                  until next period starts.
                </ListItemComponent>
                <ListItemComponent>
                  <ListIcon as={FaCrow} key="3" />
                  Log next bird before end of {format(deadline, "d/M")}
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
