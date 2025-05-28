import Slider from "@mui/material/Slider";
import styles from "./InputFields.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DataArrayIcon from "@mui/icons-material/DataArray";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrayContainer from "./ArrayContainer";
import Timer from "./Timer";
import { flushSync } from "react-dom";
import Leaderboard from "./Leaderboard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import Title from "../Title.jsx";

function InputFields({
  algorithms,
  state,
  initialState,
  dispatch,
  handleAddAlgorithm,
  handleSelectChange,
  runAlgos,
  // runAlgos,
}) {
  const totalCount = Object.keys(state.activeAlgorithms).length;
  return (
    <div className={styles.Container}>
      <Title title={"RACE MODE"} />
      <div className={styles.mainInputDiv}>
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
                dispatch({
                  type: "UPDATE_SPEED",
                  payload: parseInt(e.target.value),
                })
              }
              className={styles.speedSlider}
            />
          </div>
          <div className={`${styles.sliderDiv} ${styles.valueDiv}`}>
            <DataArrayIcon fontSize="small" sx={{ color: "white" }} />
            <Slider
              aria-label="Speed"
              defaultValue={initialState.speed}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={50}
              value={state.value}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_VALUE",
                  payload: parseInt(e.target.value),
                })
              }
              className={styles.valueSlider}
            />
          </div>
          {/* </div> */}
        </div>
        <div className={styles.raceModeContainer}>
          <div className={styles.buttonDiv}>
            <button
              className={styles.buttonStart}
              disabled={state.raceStarted}
              onClick={() => {
                flushSync(() => {
                  dispatch({ type: "RACE-STARTED" });
                });
                runAlgos();
              }}
            >
              <PlayArrowIcon fontSize="small" />
            </button>
            <button
              className={styles.buttonReset}
              onClick={() =>
                flushSync(() => dispatch({ type: "STOP-AND-RESET" }))
              }
            >
              <StopIcon fontSize="small" />
            </button>
          </div>
          <div className={styles.controls}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "#a78bfa", // light purple
                  "&.Mui-focused": { color: "#7c3aed" }, // darker purple on focus
                }}
              >
                Algorithm
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.selectedAlgorithm}
                label="Algorithm"
                onChange={handleSelectChange}
                sx={{
                  height: 40,
                  color: "white",
                  width: "150px",
                  backgroundColor: "#1e1b4b", // deep purple bg
                  borderRadius: "8px",
                  // border: "1px solid #7c3aed",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7c3aed",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a78bfa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c084fc",
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                {Object.entries(algorithms).map(([key, { name }]) => (
                  <MenuItem key={key} value={key}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <button onClick={handleAddAlgorithm}>Add Algorithm</button> */}
            <button className={styles.buttonAdd} onClick={handleAddAlgorithm}>
              <AddBoxIcon fontSize="small" sx={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* <h2>LEADERBOARD</h2> */}
        <Leaderboard state={state} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${totalCount}, 1fr)`,
          gap: "10px",
        }}
      >
        {Object.keys(state.activeAlgorithms).map((algoKey) => (
          <div key={algoKey} className={styles.algorithmContainer}>
            <div className={styles.algorithmHeader}>
              {/* <div>Time : {state.activeAlgorithms[algoKey]?.time}</div> */}
              <div className={styles.sortingInsights}>
                <Timer time={state.activeAlgorithms[algoKey]?.time} />
                <Comparisons
                  comparisons={state.activeAlgorithms[algoKey]?.comparisons}
                />
                <Swaps swaps={state.activeAlgorithms[algoKey]?.swaps} />
              </div>
              <span className={styles.algoTitle}>
                {algorithms[algoKey].name}
              </span>
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ALGORITHM",
                    payload: algoKey,
                  })
                }
              >
                ×
              </button>
            </div>

            <ArrayContainer
              state={state}
              algoKey={algoKey}
              algorithm={state.activeAlgorithms[algoKey].fn}
              dispatch={dispatch}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Comparisons({ comparisons }) {
  return (
    <div className={styles.comparisons}>
      {" "}
      <CompareArrowsIcon fontSize="medium" /> {comparisons}{" "}
    </div>
  );
}

function Swaps({ swaps }) {
  return (
    <div className={styles.swaps}>
      {" "}
      <SwapHorizIcon fontSize="medium" />
      {swaps}{" "}
    </div>
  );
}

export default InputFields;
