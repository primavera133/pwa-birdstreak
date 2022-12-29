import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import { MyList } from "./components/MyList";
import { PageAbout } from "./components/PageAbout";
import { PageHome } from "./components/PageHome";
import { PageSettings } from "./components/PageSettings";
import { GAME } from "./config/game";
import { useBirdStreakStore } from "./hooks/useBirdStreakStore";
import { parseGame } from "./logic/parseGame";
import { theme } from "./theme";

function App() {
  useEffect(() => {
    console.log("rehydrating game");
    const rehydratedGame = localStorage.getItem(GAME.persistKey);
    if (!rehydratedGame) {
      useBirdStreakStore.setState({ hasRehydrated: true });
      return;
    }

    const parsedGame = parseGame(rehydratedGame);
    useBirdStreakStore.setState({ ...parsedGame, hasRehydrated: true });

    // const parsedGame = parseGame(
    //   JSON.stringify({
    //     streakSpan: 172800000,
    //     checkInterval: 1000,
    //     gameStartDate: "2022-12-24T23:00:00.000Z",
    //     lastPeriodEnded: "2022-12-26T22:59:59.999Z",
    //     nextPeriodStarts: "2022-12-26T23:00:00.000Z",
    //     deadline: "2022-12-28T22:59:59.999Z",
    //     list: [
    //       {
    //         key: "period1",
    //         name: "Apa",
    //         date: "2022-12-28T21:26:22.954Z",
    //         periodStart: "2022-12-24T23:00:00.000Z",
    //         periodEnd: "2022-12-26T22:59:59.999Z",
    //         isNamed: true,
    //       },
    //     ],
    //     lastItem: {
    //       key: "period1",
    //       name: "Apa",
    //       date: "2022-12-28T21:26:22.954Z",
    //       periodStart: "2022-12-24T23:00:00.000Z",
    //       periodEnd: "2022-12-26T22:59:59.999Z",
    //       isNamed: true,
    //     },
    //     hasRehydrated: true,
    //     periodStart: "2022-12-26T23:00:00.000Z",
    //   })
    // );
    // useBirdStreakStore.setState({ ...parsedGame, hasRehydrated: true });
  }, []);

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
