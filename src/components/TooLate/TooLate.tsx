import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { addMilliseconds, format, isBefore } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { LogForm } from "../LogForm";

export const TooLate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deadline = useBirdStreakStore((state) => state.deadline);
  const periodStart = useBirdStreakStore((state) => state.periodStart);
  const streakSpan = useBirdStreakStore((state) => state.streakSpan);

  const birdy = getBirdy();
  const navigate = useNavigate();

  if (!deadline || !streakSpan) return null;

  // Get one streak span utnil final death
  const notTooLateToCheat = isBefore(
    new Date(),
    addMilliseconds(deadline, streakSpan)
  );

  if (!deadline || !periodStart) return null;
  return (
    <>
      <Card m="0 0 2rem" bg="brand.urgent">
        <CardBody color="brand.urgentText">
          <Heading as="h3" size="lg">
            Game over!
          </Heading>
          <Box m="1rem 0">
            <img src={birdy} alt="birdy" width="200rem" />
          </Box>
          <Box>
            <>
              You missed to log a new bird in your last period (
              {format(periodStart, "d/M")} - {format(deadline, "d/M")}).
            </>
          </Box>
          <Box>
            Go to{" "}
            <Button
              variant="link"
              onClick={() => navigate("/settings")}
              textDecoration="underline"
            >
              Settings
            </Button>{" "}
            to reset the game if you want to start a new one.
          </Box>
          {notTooLateToCheat && (
            <Box m="2rem 0 0">
              ...or you could{" "}
              <Button
                variant="link"
                textDecoration="underline"
                onClick={onOpen}
              >
                cheat
              </Button>{" "}
              a bit
            </Box>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>So you want to keep playing?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box m="0 0 1rem">
              Log your last period {format(periodStart, "d/M")} -{" "}
              {format(deadline, "d/M")}
            </Box>
            <LogForm onEditClose={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
