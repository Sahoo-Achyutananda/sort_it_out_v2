import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function RouteChangeWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    // return () => setTimeout(timer);
  }, [location]);

  return (
    <div>
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
}

export default RouteChangeWrapper;
