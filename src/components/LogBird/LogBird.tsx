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

import { useTranslation } from "react-i18next";
export const LogBird = () => {
  const [noLogsUntilNextPeriod, setNoLogsUntilNextPeriod] = useState(false);
  const { checkInterval, singleDay } = useBirdStreakStore.getState();

  const { t } = useTranslation();

  const birdy = getBirdy();

  const lastPeriodEnded = useBirdStreakStore((state) => state.lastPeriodEnded);
  const lastItem = useBirdStreakStore((state) => state.lastItem);
  const deadline = useBirdStreakStore((state) => state.deadline);
  const periodStart = useBirdStreakStore((state) => state.periodStart);
  const list = useBirdStreakStore((state) => state.list);

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
              {t("logBird.youHave", { birdName: lastItem?.name })}
            </Heading>
            <Box m="1rem 0">
              <img src={birdy} alt="birdy" width="200rem" />
            </Box>

            {periodStart && (
              <>
                <Text data-testid="next-period">
                  {t("logBird.nextPeriod", {
                    period: format(periodStart, "d/M"),
                  })}
                </Text>
                {!!hasUnNamedPeriods && (
                  <Flex align="center">
                    <Icon as={FaExclamation} />
                    <Text>{t("logBird.remains", { hasUnNamedPeriods })}</Text>
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
              <Header>{t("logBird.header")}</Header>
              <Box m="1rem 0">
                <img src={birdy} alt="birdy" width="200rem" />
              </Box>

              <ListComponent m="1rem" p="0">
                {singleDay && (
                  <>
                    <ListItemComponent>
                      <ListIcon as={FaCrow} key="1" />
                      {t("logBird.thisPeriodSingle", {
                        date: format(periodStart, "d/M"),
                      })}
                    </ListItemComponent>
                    <ListItemComponent>
                      <ListIcon as={FaCrow} key="2" />
                      {t("logBird.whenSingle")}
                    </ListItemComponent>
                  </>
                )}
                {!singleDay && (
                  <>
                    <ListItemComponent>
                      <ListIcon as={FaCrow} key="1" />
                      {t("logBird.thisPeriodMultiple", {
                        from: format(periodStart, "d/M"),
                        to: format(deadline, "d/M"),
                      })}
                    </ListItemComponent>
                    <ListItemComponent>
                      <ListIcon as={FaCrow} key="2" />
                      {t("logBird.whenMultiple")}
                    </ListItemComponent>
                    <ListItemComponent>
                      <ListIcon as={FaCrow} key="3" />
                      {t("logBird.nextMultiple", {
                        deadline: format(deadline, "d/M"),
                      })}
                    </ListItemComponent>
                  </>
                )}
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
              {t("logBird.yourList")}
            </Heading>
            <List />
          </>
        ) : null}
      </>
    </Content>
  );
};
