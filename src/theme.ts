import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    bg: "#00a5d0",
    header: "#",
    info: "#f0f8ff",
    infoText: "#333",
    infoBlock: "#fdf8d2",
    infoBLockText: "#333",
    urgent: "#ff7f50",
    urgentText: "#333",
  },
};

export const theme = extendTheme({ colors });
