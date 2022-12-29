import {
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  List as ListComponent,
  ListItem as ListItemComponent,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { ListItem } from "../../types";
import { LogForm } from "../LogForm";

export const List = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editPeriod, setEditPeriod] =
    useState<Pick<ListItem, "periodStart" | "periodEnd" | "key">>();
  const list = useBirdStreakStore((state) => state.list);
  const lastItem = useBirdStreakStore((state) => state.lastItem);

  const handleEdit = (key: string, i: number) => {
    const listItem = list.find((item) => item.key === key);
    if (!listItem) return;
    if (!listItem.isNamed || i === 0) {
      setEditPeriod(listItem);
      onEditOpen();
    }
  };

  const namedList = list.filter((item) => item.isNamed);

  let p: string;
  switch (namedList.length) {
    case 0:
      p = "no periods";
      break;
    case 1:
      p = "1 period";
      break;
    default:
      p = `${namedList.length} periods`;
  }

  const streakSpan = useBirdStreakStore((state) => state.streakSpan);

  const duration = intervalToDuration({
    start: 0,
    end: list.length * streakSpan,
  });

  return (
    <>
      <Text m="0 0 1rem" data-testid="so-far">
        So far you've locked in {p}, over a total of {formatDuration(duration)}.
      </Text>

      <ListComponent as="ul" data-testid="list">
        {[...list]
          .reverse()
          .map(
            (
              { key, name, periodStart, periodEnd, isNamed }: ListItem,
              i: number
            ) => (
              <Card
                as={ListItemComponent}
                bg={isNamed ? "brand.info" : "brand.infoBlock"}
                key={key}
                m="0 0 1rem"
                onClick={() => handleEdit(key, i)}
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
                  {!isNamed || (i === 0 && <Icon as={FaRegEdit} />)}
                </Flex>
              </Card>
            )
          )}
      </ListComponent>
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editPeriod && (
              <>
                Edit period {format(editPeriod?.periodStart, "d/M")} -{" "}
                {format(editPeriod?.periodEnd, "d/M")}
              </>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LogForm periodKey={editPeriod?.key} onEditClose={onEditClose} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onEditClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
