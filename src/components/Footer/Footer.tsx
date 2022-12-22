import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer">
    <div>
      Icon:{" "}
      <a href="https://www.freepik.com/free-vector/hand-drawn-robin-collection_18895184.htm#query=illustrations%20bird&position=18&from_view=search&track=sph">
        Freepik
      </a>
    </div>
    <div>
      <Link to="/settings">settings</Link>
    </div>
  </footer>
);
