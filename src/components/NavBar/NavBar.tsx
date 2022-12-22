import { Link } from "react-router-dom";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";

export const NavBar = () => {
  const gameStartDate = useBirdStreakStore((state) => state.gameStartDate);

  return (
    <div className="navbar">
      <div className="title">
        <img src="logo.png" width={32} height={32} alt="logo" />
        <h1>Birdstreak</h1>
      </div>
      <div className="links">
        {gameStartDate && (
          <>
            <Link to="/">Log</Link>
            <Link to="/list">List</Link>
          </>
        )}
      </div>
    </div>
  );
};
