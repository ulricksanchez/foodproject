import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tutorial } from "./pages/Tutorial";
import { ErrorMessage } from "./pages/ErrorMessage";
import { Search } from "./pages/Search";
import { FoodDetail } from "./pages/FoodDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tutorial/:id" element={<Tutorial />} />
          <Route path="/food-detail/:id" element={<FoodDetail />} />
          <Route path="/search/:queryTerm" element={<Search />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
