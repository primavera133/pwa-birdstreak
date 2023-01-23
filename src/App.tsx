import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyList } from "./components/MyList";
import { PageAbout } from "./components/PageAbout";
import { PageHome } from "./components/PageHome";
import { PageSettings } from "./components/PageSettings";
import { GAME } from "./config/game";
import { useBirdStreakStore } from "./hooks/useBirdStreakStore";
// import { moveDate } from "./logic/moveDate";
import { parseGame } from "./logic/parseGame";
import { migrate } from "./migrations";
// import * as testData from "./testData/birdStreakDataDump (10).json";
import i18n, { changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./locales/en/messages.json";
import * as sv from "./locales/sv/messages.json";
import { theme } from "./theme";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      sv,
    },
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const language = localStorage.getItem(GAME.languageKey);
  if (language) {
    changeLanguage(language);
  }

  const appVersion = `${process.env.REACT_APP_VERSION}`;
  console.log("app version", appVersion);

  useEffect(() => {
    console.log("rehydrating", GAME.persistKey);
    const rehydratedGame = localStorage.getItem(GAME.persistKey);
    // const rehydratedGame = JSON.stringify(testData);

    if (!rehydratedGame) {
      useBirdStreakStore.setState({ hasRehydrated: true, appVersion });
      return;
    }

    const parsedGame = migrate(parseGame(rehydratedGame));
    // const parsedGame = migrate(
    //   moveDate(parseGame(rehydratedGame), "backward", 14)
    // );

    useBirdStreakStore.setState({
      ...parsedGame,
      hasRehydrated: true,
      appVersion,
    });
  }, [appVersion]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/list" element={<MyList />} />
          <Route path="/settings" element={<PageSettings />} />
          <Route path="/about" element={<PageAbout />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
