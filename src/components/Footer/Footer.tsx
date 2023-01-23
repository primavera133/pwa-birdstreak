import { Icon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaCog, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Flex
      as="footer"
      bg="brand.bg"
      p=".75rem"
      justifyContent="flex-end"
      data-name="footer"
    >
      <Box color="white">
        <Box as={Link} to="/about" m="0 1rem 0 0">
          <Icon as={FaStar}>{t("footer.about")}</Icon>
        </Box>
        <Box as={Link} to="/settings" m="0 1rem 0 0">
          <Icon as={FaCog}>{t("footer.settings")}</Icon>
        </Box>
      </Box>
    </Flex>
  );
};
