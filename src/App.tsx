import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MyList } from "./components/MyList";
import { PageHome } from "./components/PageHome";

function App() {
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
