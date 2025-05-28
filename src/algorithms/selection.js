import * as utils from "../utils/utils.js";

async function selectionSort(arr, getStateRef, dispatch, controllerRef = null) {
  dispatch({ type: "sortingStarted", algoName: "selection" });
  console.log(controllerRef);
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;

  const array = [...arr];
  const n = array.length;

  var i, j;

  for (i = 0; i < n; i++) {
    var min_index = i;

    for (j = i + 1; j < n; j++) {
      if (!getState().isSorting) return;
      dispatch({
        type: "selectedIndices",
        payload: [min_index, j],
        algoName: "selection",
      });
      speed = getState().speed;
      await utils.randomDelay(1 / speed);

      // console.log(controllerRef, "Hello");
      dispatch({ type: "comparisonPlus", algoName: "selection" });
      if (array[min_index] > array[j]) {
        min_index = j;
      }
    }

    if (min_index !== i) {
      let temp = array[min_index];
      array[min_index] = array[i];
      array[i] = temp;
      dispatch({ type: "swapPlus", algoName: "selection" });
    }

    dispatch({ type: "arrayMovements", payload: array, algoName: "selection" });
  }
  dispatch({ type: "sortingCompleted", algoName: "selection" });
}

export default selectionSort;
