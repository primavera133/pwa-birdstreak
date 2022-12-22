import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";

const NavBar = () => (
  <div className="navbar">
    <img src="logo.png" width={32} height={32} alt="logo" />
    <h1>Birdstreak</h1>
    <div className="links">
      <Link to="/">Log</Link>
      <Link to="/purchased">List</Link>
    </div>
  </div>
);

const LogBird = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <h2>Log next bird</h2>
      </Content>
      <Footer />
    </Layout>
  );
};

const MyList = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <h2>My list</h2>
        <ul className="MyList">
          <li>domherre</li>
          <li>talgoxe</li>
          <li>blåmes</li>
        </ul>
      </Content>
      <Footer />
    </Layout>
  );
};

const Content = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => <div className="content">{children}</div>;

const Footer = () => (
  <footer className="footer">
    Icon:{" "}
    <a href="https://www.freepik.com/free-vector/hand-drawn-robin-collection_18895184.htm#query=illustrations%20bird&position=18&from_view=search&track=sph">
      Freepik
    </a>
  </footer>
);

const Layout = ({ children }: { children: JSX.Element[] }): JSX.Element => (
  <div className="layout">{children}</div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogBird />} />
        <Route path="/purchased" element={<MyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
