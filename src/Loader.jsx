import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";

// Default values shown

function Loader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ripples size="200" speed="2" color="white" />
    </div>
  );
}

export default Loader;
