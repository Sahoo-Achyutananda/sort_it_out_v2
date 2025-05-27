import * as utils from "../utils/utils.js";

async function bubbleSort(arr, getStateRef, dispatch, controllerRef) {
  dispatch({ type: "sortingStarted" });
  const array = [...arr];

  let len = array.length;
  let i, j;

  for (i = 0; i < len; i++) {
    for (j = 0; j < len - i - 1; j++) {
      // if (controllerRef.current.signal.aborted()) return;
      console.log(controllerRef.current);
      let currentState = getStateRef(); // to fetch the updated state everytime.

      if (currentState.current.isSorting === false) return;

      dispatch({ type: "selectedIndices", payload: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      dispatch({ type: "arrayMovements", payload: array });

      await utils.randomDelay(1 / currentState.current.speed);
    }
  }
}

export default bubbleSort;
