import BubbleSort from "./pages/BubbleSort";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectionSort from "./pages/SelectionSort";
import InsertionSort from "./pages/InsertionSort";
import MergeSort from "./pages/MergeSort";
import QuickSort from "./pages/QuickSort";
import RaceMode from "./pages/raceMode/RaceMode";
import HomePage from "./pages/homePage/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bubble" element={<BubbleSort />} />
        <Route path="/selection" element={<SelectionSort />} />
        <Route path="/insertion" element={<InsertionSort />} />
        <Route path="/merge" element={<MergeSort />} />
        <Route path="/quick" element={<QuickSort />} />
        <Route path="/racemode" element={<RaceMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
