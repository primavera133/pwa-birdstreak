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
  List,
  ListIcon,
  ListItem as ListItemComponent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { addMilliseconds, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { FaCrow } from "react-icons/fa";
import { GAME } from "../../config/game";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { normaliseName } from "../../logic/normaliseName";
import { validateInput } from "../../logic/validateInput";
import { ListItem } from "../../types";
import { Header } from "../Header";

export const LogForm = () => {
  const [name, setName] = useState("");
  const [birdy] = useState(getBirdy());
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

  if (!gameStartDate) return null; // typechecking to keep ts happy

  const periodStart = lastItem ? lastItem.periodEnd : gameStartDate;

  const periodEnd = addMilliseconds(periodStart, streakSpan - 1);

  const handleLockIn = async () => {
    const valid = validateInput(name, list);
    if (!valid) {
      alert("bird name is already logged");
      return;
    }

    const listItem: ListItem = {
      name,
      date: new Date(),
      periodStart,
      periodEnd,
    };

    // update app state
    useBirdStreakStore.setState({
      list: [...list, listItem],
      lastItem: listItem,
      lastPeriodEnded: periodEnd,
      nextPeriodStarts: addMilliseconds(periodEnd, 1),
      deadline: addMilliseconds(periodEnd, streakSpan - 1),
    });

    setName(""); // reset input

    // persist total state
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header>Log your next bird</Header>
      <Box m="1rem 0">
        <img src={birdy} alt="birdy" width="200rem" />
      </Box>

      <List m="1rem" p="0">
        <ListItemComponent>
          <ListIcon as={FaCrow} key="1" />
          This period spans from {format(periodStart, "d/M")} to{" "}
          {format(periodEnd, "d/M")}.
        </ListItemComponent>
        <ListItemComponent>
          <ListIcon as={FaCrow} key="2" />
          When you have locked in on a bird you cannot add a new one until next
          period starts.
        </ListItemComponent>
        <ListItemComponent>
          <ListIcon as={FaCrow} key="3" />
          Log next bird before end of {format(periodEnd, "d/M")}
        </ListItemComponent>
      </List>
      <Box
        as="label"
        htmlFor="name"
        fontWeight="bold"
        fontSize="xl"
        m="0 0 1rem"
      >
        Bird name to log
      </Box>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Crow, Heron, etc"
        m="0 0 1rem"
      />
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
        onClose={onClose}
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
              <Button ref={cancelRef} onClick={onClose}>
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
