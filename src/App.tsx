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
import { theme } from "./theme";

function App() {
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
