import { Box, Button, Input, Text } from "@chakra-ui/react";
import {
  addDays,
  addMilliseconds,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";
import { subDays } from "date-fns/esm";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GAME } from "../../config/game";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { normaliseName } from "../../logic/normaliseName";
import { validateInput } from "../../logic/validateInput";

export const LogForm = ({ onEditClose }: { onEditClose?: () => void }) => {
  const [name, setName] = useState("");
  const [trimmedName, setTrimmedName] = useState("");
  const [nameError, setNameError] = useState("");

  const { streakSpan } = useBirdStreakStore.getState();

  const { t } = useTranslation();

  const list = useBirdStreakStore((state) => state.list);
  const periodStart = useBirdStreakStore((state) => state.periodStart);
  const editPeriod = useBirdStreakStore((state) => state.editPeriod);

  // Normalize name
  useEffect(() => {
    if (!name) return;
    const n = normaliseName(name);
    const t = n.trim();
    if (name !== n) {
      setName(n);
    }
    if (trimmedName !== t) {
      setTrimmedName(t);
    }
  }, [name, trimmedName]);

  useEffect(() => {
    if (editPeriod) {
      const listItem = list.find((item) => item.key === editPeriod.key);
      setName(listItem?.name || "");
    }
  }, [editPeriod, list]);

  if (!periodStart) return null; // typechecking to keep date-fns happy

  let editPeriodStart = editPeriod ? editPeriod.periodStart : periodStart;

  const editPeriodEnd = editPeriod
    ? editPeriod.periodEnd
    : endOfDay(subDays(addMilliseconds(editPeriodStart, streakSpan), 1));

  const handleLockIn = async () => {
    //
    const listItem = {
      key: editPeriod?.key || `period${list.length + 1}`,
      name: trimmedName,
      date: new Date(),
      periodStart: editPeriodStart,
      periodEnd: editPeriodEnd,
      isNamed: true,
    };

    const newList = editPeriod
      ? list.map((item) => {
          if (item.key === editPeriod.key) {
            return listItem;
          } else {
            return item;
          }
        })
      : [...list, listItem];

    const lastItem = newList[newList.length - 1];
    const deadline = addMilliseconds(lastItem.periodEnd, streakSpan);

    const newPeriodStart = startOfDay(addDays(lastItem.periodEnd, 1));

    // update app state
    useBirdStreakStore.setState({
      appVersion: `${process.env.REACT_APP_VERSION}`,
      list: newList,
      lastItem,
      lastPeriodEnded: lastItem.periodEnd,
      periodStart: newPeriodStart,
      deadline,
      editPeriod: undefined,
    });

    // reset input and errors
    setName("");
    setNameError("");

    // persist total state
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );

    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput(trimmedName, list, editPeriodStart)) {
      const item = list.find((item) => item.name === trimmedName);
      if (item) {
        setNameError(
          `You logged ${trimmedName} for ${format(
            item.periodStart,
            "d/M"
          )} - ${format(item.periodEnd, "d/M")} already.`
        );
        return;
      }
    }

    handleLockIn();
  };

  const handleClose = () => {
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
        {t("logForm.labelName")}
      </Box>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("logForm.namePlaceholder") || ""}
        m="0 0 .5rem"
      />
      <Text color="brand.urgent" m="0 0 1rem">
        {nameError}
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        type="submit"
        disabled={!trimmedName}
        m="0 0 5rem"
      >
        {trimmedName ? (
          <Text>
            {t("logForm.lockBtn")} {trimmedName}
          </Text>
        ) : (
          <Text>{t("logForm.lockBtn")}</Text>
        )}
      </Button>
    </form>
  );
};
