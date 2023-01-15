import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";

import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { isToday } from "date-fns";
import { useTranslation } from "react-i18next";
import { FaBell } from "react-icons/fa";

export const Deadline = () => {
  const deadline = useBirdStreakStore((state) => state.deadline);

  const { t } = useTranslation();

  if (!deadline) return null;

  const isUrgent = isToday(deadline);

  return isUrgent ? (
    <Card m="0 0 1rem" bg="brand.urgent">
      <Flex as={CardBody} color="brand.urgentText" align="center">
        <Icon as={FaBell} boxSize="6" m="0 1rem 0 0 " />
        <Heading as="h3" size="md">
          {t("deadline.text")}
        </Heading>
      </Flex>
    </Card>
  ) : null;
};
