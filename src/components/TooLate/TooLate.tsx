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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { getBirdy } from "../../logic/getBirdy";
import { LogForm } from "../LogForm";

export const TooLate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const singleDay = useBirdStreakStore((state) => state.singleDay);
  const deadline = useBirdStreakStore((state) => state.deadline);
  const periodStart = useBirdStreakStore((state) => state.periodStart);
  const streakSpan = useBirdStreakStore((state) => state.streakSpan);

  const { t } = useTranslation();

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
            {t("tooLate.header")}
          </Heading>
          <Box m="1rem 0">
            <img src={birdy} alt="birdy" width="200rem" />
          </Box>
          <Box>
            <>
              {t("tooLate.text")} ({format(periodStart, "d/M")}
              {!singleDay && <> - {format(deadline, "d/M")}</>}).
            </>
          </Box>
          <Box>
            {t("tooLate.goto")}{" "}
            <Button
              variant="link"
              onClick={() => navigate("/settings")}
              textDecoration="underline"
            >
              {t("tooLate.btnSettings")}
            </Button>{" "}
            {t("tooLate.goto2")}
          </Box>
          {notTooLateToCheat && (
            <Box m="2rem 0 0">
              {t("tooLate.cheat")}{" "}
              <Button
                variant="link"
                textDecoration="underline"
                onClick={onOpen}
              >
                {t("tooLate.cheatBtn")}
              </Button>{" "}
              {t("tooLate.cheat2")}
            </Box>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("tooLate.modalHeader")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box m="0 0 1rem">
              {singleDay && (
                <>
                  {t("tooLate.modalLogDay")} {format(periodStart, "d/M")}
                </>
              )}
              {!singleDay && (
                <>
                  {t("tooLate.modalLogPeriod")} {format(periodStart, "d/M")} -{" "}
                  {format(deadline, "d/M")}
                </>
              )}
            </Box>
            <LogForm onEditClose={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {t("tooLate.modalBtn")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
