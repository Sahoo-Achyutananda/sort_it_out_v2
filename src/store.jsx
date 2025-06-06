import * as utils from "./utils/utils";
import { launchConfetti } from "./utils/confetti.js";

export function reducer(state, action) {
  switch (action.type) {
    case "customInput": {
      const str = action.payload;
      const arr = str
        .trim()
        .split(/\s+/)
        .map((i) => parseInt(i))
        .filter((num) => !isNaN(num) && num <= 300);
      // console.log(arr);
      return {
        ...state,
        value: arr.length ? arr.length : 20,
        array: arr.length
          ? arr
          : Array.from(
              { length: 20 },
              () => Math.floor(Math.random() * 350) + 1
            ),
      };
    }

    case "speedChange":
      return { ...state, speed: Number(action.payload) };
    case "resetValues":
      return {
        ...state,
        array: utils.generateArray(state.value),
        selectedIndices: [],
        swappedIndices: [],
        isSorting: false,
        time: 0,
        swaps: 0,
        description: "Start a sort to see details.",
        comparisons: 0,
      };
    case "valueChange":
      return {
        ...state,
        value: Number(action.payload),
        array: utils.generateArray(Number(action.payload)),
        selectedIndices: [],
        swappedIndices: [],
        isSorting: false,
        custom_input: "",
        time: 0,
        swaps: 0,
        description: "Start a sort to see details.",
        comparisons: 0,
      };
    case "arrayMovements":
      return {
        ...state,
        array: action.payload,
      };
    case "selectedIndices":
      return {
        ...state,
        selectedIndices: action.payload,
      };
    case "highlightIndices":
      return {
        ...state,
        highlightIndices: action.payload,
      };
    case "sortingStarted":
      return {
        ...state,
        isSorting: true,
        time: 0,
      };
    case "hold":
      return {
        ...state,
        hold: action.payload,
      };
    case "tick":
      return {
        ...state,
        time: state.isSorting ? state.time + 1 : state.time,
      };
    case "swapPlus": {
      console.log(action);
      return {
        ...state,
        swaps: state.swaps + 1,
        swappedIndices: action.payload,
      };
    }
    case "comparisonPlus":
      return {
        ...state,
        comparisons: state.comparisons + 1,
      };
    // case "swappedIndices":
    //   return {
    //     ...state,
    //     swappedIndices: action.payload,
    //   };
    case "sortingCompleted": {
      launchConfetti();
      return {
        ...state,
        isSorting: false,
        selectedIndices: [],
        highlightIndices: [],
        swappedIndices: [],
        hold: [],
      };
    }

    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };

    case "toggleChange":
      return { ...state, toggle: action.payload };
  }
}

export const initialState = {
  custom_input: [],
  speed: 1,
  value: 20,
  toggle: "bar", // can have only 2 values - bar and box
  array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 350) + 1),
  selectedIndices: [],
  highlightIndices: [],
  isSorting: false,
  time: 0,
  swaps: 0,
  comparisons: 0,
  description: "Start to see details.",
  swappedIndices: [],
  hold: [], // to highlight a particular bar/box in the visualizer - used to show current min element in Selection sort
};
