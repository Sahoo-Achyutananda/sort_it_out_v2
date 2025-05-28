import * as utils from "../utils/utils.js";

async function partition(arr, l, r, getStateRef, dispatch) {
  let pivot = arr[r];
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;
  let i = l - 1;

  for (let j = l; j < r; j++) {
    dispatch({ type: "comparisonPlus", algoName: "quick" });
    if (arr[j] <= pivot) {
      if (!getState().isSorting) return;
      dispatch({ type: "selectedIndices", payload: [j, r], algoName: "quick" });
      dispatch({ type: "highlightIndices", payload: [i], algoName: "quick" });
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      dispatch({ type: "swapPlus", algoName: "quick" });
      dispatch({
        type: "arrayMovements",
        payload: [...arr],
        algoName: "quick",
      });
      speed = getState().speed;
      await utils.randomDelay(1 / speed);
    }
  }
  [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
  if (!getState().isSorting) return;
  dispatch({ type: "swapPlus", algoName: "quick" });
  dispatch({ type: "arrayMovements", payload: [...arr], algoName: "quick" });
  speed = getState().speed;
  await utils.randomDelay(1 / speed);

  return i + 1;
}

async function quickSort(arr, low, high, getStateRef, dispatch) {
  const getState = () => getStateRef()?.current || getStateRef();
  if (!getState().isSorting) return;
  if (low < high) {
    let pi = await partition(arr, low, high, getStateRef, dispatch);
    await quickSort(arr, low, pi - 1, getStateRef, dispatch);
    await quickSort(arr, pi + 1, high, getStateRef, dispatch);
  }
}

async function performQuickSort(
  arr,
  getStateRef,
  dispatch,
  controllerRef = null
) {
  try {
    dispatch({ type: "sortingStarted", algoName: "quick" });
    await quickSort(arr, 0, arr.length - 1, getStateRef, dispatch);
  } finally {
    dispatch({ type: "sortingCompleted", algoName: "quick" });
    console.log(controllerRef);
  }
}

export default performQuickSort;
