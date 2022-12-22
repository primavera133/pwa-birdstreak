import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MyList } from "./components/MyList";
import { PageHome } from "./components/PageHome";
import { Settings } from "./components/Settings";
import { GAME } from "./config/game";
import { useBirdStreakStore } from "./hooks/useBirdStreakStore";
import { parseGame } from "./logic/parseGame";

function App() {
  useEffect(() => {
    const rehydratedGame = localStorage.getItem(GAME.persistKey);
    if (!rehydratedGame) return;
    console.log("rehydrating game");

    const parsedGame = parseGame(rehydratedGame);
    useBirdStreakStore.setState({ ...parsedGame });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/list" element={<MyList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
