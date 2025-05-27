function getRandomHeight() {
  const height = Math.floor(Math.random() * 350);
  return `${height}px`;
}

function randomDelay(secs) {
  const delay = secs * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function generateArray(length) {
  const arr = Array.from(
    { length: length },
    () => Math.floor(Math.random() * 350) + 1
  );

  return arr;
}

function generateArrayforRace(length) {
  const arr = Array.from(
    { length: length },
    () => Math.floor(Math.random() * 170) + 1
  );

  return arr;
}

export { getRandomHeight, randomDelay, generateArray, generateArrayforRace };
