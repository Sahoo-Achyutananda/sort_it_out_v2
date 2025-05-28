import Slider from "@mui/material/Slider";
import styles from "./InputFields.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DataArrayIcon from "@mui/icons-material/DataArray";
import SpeedIcon from "@mui/icons-material/Speed";
import { flushSync } from "react-dom";

import { styled } from "@mui/material/styles";
import Timer from "./Timer.jsx";
import BarChartIcon from "@mui/icons-material/BarChart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const CustomToggleButton = styled(ToggleButton)(() => ({
  color: "white",
  backgroundColor: "#424242",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "rgb(103, 3, 204)",
  },
}));

function InputFields({
  dispatch,
  state,
  stateRef,
  initialState,
  algo,
  controllerRef,
}) {
  return (
    <div className={styles.userInputs}>
      <div className={`${styles.sliderDiv} ${styles.speedDiv}`}>
        <SpeedIcon fontSize="small" sx={{ color: "white" }} />
        <Slider
          aria-label="Speed"
          defaultValue={initialState.speed}
          valueLabelDisplay="auto"
          step={0.25}
          marks
          min={0.25}
          max={10}
          value={state.speed}
          onChange={(e) =>
            dispatch({ type: "speedChange", payload: e.target.value })
          }
          className={styles.speedSlider}
        />
      </div>
      <div className={`${styles.sliderDiv} ${styles.valueDiv}`}>
        <DataArrayIcon fontSize="small" sx={{ color: "white" }} />
        <Slider
          aria-label="Speed"
          defaultValue={20}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={50}
          value={state.value}
          onChange={(e) =>
            dispatch({ type: "valueChange", payload: e.target.value })
          }
          className={styles.valueSlider}
        />
      </div>
      <div className={styles.utilitiesDiv}>
        <div className={styles.buttonDiv}>
          <button
            className={styles.buttonStart}
            disabled={state.isSorting}
            onClick={() => {
              flushSync(() => {
                dispatch({ type: "sortingStarted" }); // Sync update
              });
              algo(state.array, () => stateRef, dispatch, controllerRef);
            }}
          >
            <PlayArrowIcon fontSize="small" />
          </button>
          <button
            className={styles.buttonReset}
            onClick={() => dispatch({ type: "resetValues" })}
          >
            {state.isSorting ? (
              <StopIcon fontSize="small" />
            ) : (
              <RestartAltIcon fontSize="small" />
            )}
          </button>
        </div>

        <div className={styles.utilities}>
          <Timer getState={() => state} dispatch={dispatch} />
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={state.toggle}
            exclusive
            onChange={(e, newValue) => {
              if (newValue)
                dispatch({ type: "toggleChange", payload: newValue });
            }}
          >
            <CustomToggleButton value="bar">
              <BarChartIcon fontSize="small" />
            </CustomToggleButton>
            <CustomToggleButton value="box">
              <WidgetsIcon fontSize="small" />
            </CustomToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default InputFields;
