import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";

import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { format, isToday } from "date-fns";
import { FaClipboardList } from "react-icons/fa";
export const Deadline = () => {
  const deadline = useBirdStreakStore((state) => state.deadline);

  if (!deadline) return null;

  const isUrgent = !isToday(deadline);

  return isUrgent ? (
    <Card m="0 0 1rem" bg="brand.urgent">
      <Flex as={CardBody} color="brand.urgentText" align="center">
        <Icon as={FaClipboardList} />
        <Heading as="h3" size="md">
          Log next bird before end of today!
        </Heading>
      </Flex>
    </Card>
  ) : (
    <Card m="0 0 1rem" bg="brand.semiUrgent">
      <Flex as={CardBody} color="brand.semiUrgentText" align="center">
        <Icon as={FaClipboardList} />
        <Heading as="h3" size="md">
          Log next bird before {format(deadline, "yyyy-MM-dd")}
        </Heading>
      </Flex>
    </Card>
  );
};
