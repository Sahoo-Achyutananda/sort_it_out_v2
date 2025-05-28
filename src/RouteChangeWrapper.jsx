import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function RouteChangeWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
      "/": "Home | Sort Visualizer",
      "/bubble": "Bubble Sort | Sort Visualizer",
      "/selection": "Selection Sort | Sort Visualizer",
      "/insertion": "Insertion Sort | Sort Visualizer",
      "/merge": "Merge Sort | Sort Visualizer",
      "/quick": "Quick Sort | Sort Visualizer",
      "/racemode": "Race Mode | Sort Visualizer",
    };

    document.title = titleMap[path] || "Sort Visualizer";
  }, [location]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
}

export default RouteChangeWrapper;
