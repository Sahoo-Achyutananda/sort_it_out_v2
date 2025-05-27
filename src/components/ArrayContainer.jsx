import styles from "./ArrayContainer.module.css";
// import * as utils from "../utils/utils.js";
import { useRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

function ArrayContainer({ state }) {
  const arrayContainerRef = useRef(null);
  return (
    <div>
      <div className={styles.arrayContainer} ref={arrayContainerRef}>
        {state.toggle === "bar"
          ? state.array.map((value, i) => {
              return (
                <Bar
                  key={i}
                  arrayContainerRef={arrayContainerRef}
                  state={state}
                  height={value}
                  index={i}
                />
              );
            })
          : state.array.map((value, i) => {
              return <Box key={i} height={value} />;
            })}
      </div>
      <div></div>
    </div>
  );
}

function Bar({ arrayContainerRef, state, height, index }) {
  const [dimensions, setDimensions] = useState({
    height: "50px",
    width: "50px",
  });
  useEffect(() => {
    if (arrayContainerRef.current) {
      const containerWidth = arrayContainerRef.current.offsetWidth;
      const boxWidth = containerWidth / state.value - 2;
      setDimensions({
        height: height,
        width: `${boxWidth}px`,
      });
    }
  }, [arrayContainerRef, state.value, height, state.selectedIndices, index]);

  const barClasses = [
    styles.bar,
    state.selectedIndices.includes(index) ? styles.selected : "",
  ].join(" ");

  const indexClasses = [
    styles.index,
    state.highlightIndices.includes(index) ? styles.highlightedIndex : "",
  ].join(" ");

  return (
    <div className={styles.barContainer}>
      <div
        className={indexClasses}
        style={{
          width: dimensions.width,
        }}
      >
        {index}
      </div>
      <Tooltip title={height} arrow>
        <div className={barClasses} style={dimensions}></div>
      </Tooltip>
    </div>
  );
}

function Box({ height }) {
  return <div className={styles.box}>{height}</div>;
}
export default ArrayContainer;
