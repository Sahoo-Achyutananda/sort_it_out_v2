import styles from "./ArrayContainer.module.css";
// import * as utils from "../utils/utils.js";
import { useRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
// import { ToastContainer, toast } from "react-toastify";

function ArrayContainer({ state }) {
  const arrayContainerRef = useRef(null);
  // const compSpan = useRef(null);
  // const [compBlink, setCompBlink] = useState(false);
  // const [swapBlink, setSwapBlink] = useState(false);

  // useEffect(() => {
  //   setCompBlink(true);
  //   const speedFactor = 1000 / state.speed;
  //   const timer = setTimeout(() => {
  //     setCompBlink(false);
  //   }, speedFactor);

  //   return () => clearTimeout(timer);
  // }, [state.comparisons, state.speed]);

  // useEffect(() => {
  //   setSwapBlink(true);
  //   const speedFactor = 1000 / state.speed;
  //   const timer = setTimeout(() => {
  //     setSwapBlink(false);
  //   }, speedFactor);

  //   return () => clearTimeout(timer);
  // }, [state.comparisons, state.speed]);

  return (
    <>
      <div
        className={`${
          state.toggle === "bar"
            ? styles.arrayContainer
            : styles.arrayContainerBoxView
        }`}
        ref={arrayContainerRef}
      >
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
              return <Box key={i} state={state} index={i} height={value} />;
            })}
      </div>

      <div className={styles.stats}>
        <div className={styles.description}>
          <div className={styles.descriptionDiv}>
            <div>{state.description}</div>
            <span>What's Happening</span>
          </div>
        </div>
        <div className={styles.counts}>
          <div className={styles.compsDiv}>
            <div>{state.comparisons}</div>
            <span>Comparisons</span>
          </div>
          <div className={styles.swapsDiv}>
            <div>{state.swaps}</div>
            <span>Swaps</span>
          </div>
        </div>
      </div>
    </>
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
    // state.swappedIndices.includes(index) ? styles.compared : "",
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

function Box({ state, height, index }) {
  const boxClasses = [
    styles.box,
    state.selectedIndices.includes(index) ? styles.selected : "",
    // state.swappedIndices.includes(index) ? styles.compared : "",
  ].join(" ");
  return <div className={boxClasses}>{height}</div>;
}
export default ArrayContainer;
