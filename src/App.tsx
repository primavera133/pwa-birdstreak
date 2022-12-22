import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MyList } from "./components/MyList";
import { PageHome } from "./components/PageHome";
import { useBirdStreakStore } from "./hooks/useBirdStreakStore";
import { parseGame } from "./logic/parseGame";

function App() {
  useEffect(() => {
    const rehydratedGame = localStorage.getItem("game");
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
