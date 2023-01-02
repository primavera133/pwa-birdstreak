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
  const appVersion = `${process.env.REACT_APP_VERSION}`;
  console.log("app version", appVersion);
  useEffect(() => {
    console.log("rehydrating game");
    const rehydratedGame = localStorage.getItem(GAME.persistKey);

    if (!rehydratedGame) {
      useBirdStreakStore.setState({ hasRehydrated: true, appVersion });
      return;
    }

    const parsedGame = parseGame(rehydratedGame);
    useBirdStreakStore.setState({
      ...parsedGame,
      hasRehydrated: true,
      appVersion,
    });
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
