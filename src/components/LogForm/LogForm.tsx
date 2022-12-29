import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { addMilliseconds, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { GAME } from "../../config/game";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { normaliseName } from "../../logic/normaliseName";
import { validateInput } from "../../logic/validateInput";
import { ListItem } from "../../types";

export const LogForm = ({
  periodKey,
  onEditClose,
}: {
  periodKey?: string;
  onEditClose?: () => void;
}) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [period, setPeriod] =
    useState<Pick<ListItem, "periodStart" | "periodEnd" | "key">>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { streakSpan } = useBirdStreakStore.getState();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const gameStartDate = useBirdStreakStore((state) => state.gameStartDate);
  const list = useBirdStreakStore((state) => state.list);
  const lastItem = useBirdStreakStore((state) => state.lastItem);

  // Normalize name
  useEffect(() => {
    if (!name) return;
    const n = normaliseName(name);
    if (name !== n) setName(n);
  }, [name]);

  useEffect(() => {
    if (periodKey) {
      const listItem = list.find((item) => item.key === periodKey);
      setPeriod(listItem);
    }
  }, [periodKey, list]);

  if (!gameStartDate) return null; // typechecking to keep date-fns happy

  const periodStart = period
    ? period.periodStart
    : lastItem
    ? lastItem.periodEnd
    : gameStartDate;

  const periodEnd = period
    ? period.periodEnd
    : addMilliseconds(periodStart, streakSpan - 1);

  const handleLockIn = async () => {
    const listItem: ListItem = {
      key: period ? period.key : `period${list.length + 1}`,
      name,
      date: new Date(),
      periodStart,
      periodEnd,
      isNamed: true,
    };

    const newList = period
      ? list.map((item) => {
          if (item.key === period.key) {
            return listItem;
          } else {
            return item;
          }
        })
      : [...list, listItem];

    const lastItem = period ? newList[newList.length - 1] : listItem;

    const nextPeriodStarts = lastItem
      ? addMilliseconds(lastItem.periodEnd, 1)
      : addMilliseconds(listItem.periodEnd, 1);

    const deadline = lastItem
      ? addMilliseconds(lastItem.periodEnd, streakSpan - 1)
      : addMilliseconds(listItem.periodEnd, streakSpan - 1);

    // update app state
    useBirdStreakStore.setState({
      list: newList,
      lastItem,
      lastPeriodEnded: periodEnd,
      nextPeriodStarts,
      deadline,
    });

    // reset input and errors
    setName("");
    setNameError("");
    // setPeriod(undefined);

    // persist total state
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );

    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const valid = validateInput(name, list);
    if (!valid) {
      const item = list.find((item) => item.name === name);
      if (item) {
        setNameError(
          `You logged ${name} for ${format(item.periodStart, "d/M")} - ${format(
            item.periodEnd,
            "d/M"
          )} already.`
        );
      }
      return;
    }

    onOpen();
  };

  const handleClose = () => {
    onClose();
    if (onEditClose) onEditClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        as="label"
        htmlFor="name"
        fontWeight="bold"
        fontSize="xl"
        m="0 0 1rem"
        display="inline-block"
      >
        Bird name to log
      </Box>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Crow, Heron, etc"
        m="0 0 .5rem"
      />
      <Text color="brand.urgent" m="0 0 1rem">
        {nameError}
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        type="submit"
        disabled={!name}
        m="0 0 5rem"
      >
        {name ? <Text>Lock in {name}</Text> : <Text>Lock in</Text>}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Lock in {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLockIn} ml={3}>
                Lock
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </form>
  );
};
