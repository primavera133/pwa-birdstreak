import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { ListItem } from "../../types";

// import { FaRegEdit } from "react-icons/fa";

export const List = () => {
  const list = useBirdStreakStore((state) => state.list);

  // TODO: edit
  // const handleEdit = () => {
  //   alert("Edit a list item is yet to be developed");
  // };

  const p = list?.length === 1 ? "1 period" : `{list.length} periods`;

  const streakSpan = useBirdStreakStore((state) => state.streakSpan);

  const duration = intervalToDuration({
    start: 0,
    end: list.length * streakSpan,
  });

  return (
    <>
      <Text m="0 0 1rem" data-testid="so-far">
        So far you've locked in {p}, a total of {formatDuration(duration)}.
      </Text>

      <Flex
        as="ul"
        className="List"
        flexDirection="column-reverse"
        data-testid="list"
      >
        {list.map(({ name, periodStart, periodEnd }: ListItem, i: number) => (
          <Card
            as="li"
            key={name}
            className="list-item"
            bg="brand.info"
            m="0 0 1rem"
          >
            <Flex as={CardBody} align="center">
              <Text
                fontSize="s"
                m="0 1rem 0 0"
                data-testid={`listItemPeriod${i}`}
              >
                {format(periodStart, "d/M")} - {format(periodEnd, "d/M")}
              </Text>
              <Text
                fontWeight="bold"
                fontSize="lg"
                textTransform="capitalize"
                flex="1"
                data-testid={`listItemName${i}`}
              >
                {name}
              </Text>
              {/* <Icon as={FaRegEdit} onClick={handleEdit} /> */}
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
};
