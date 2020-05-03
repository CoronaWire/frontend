
export const retry = (
  conditionFunc = () => true,
  executeFunc = () => null,
  numTries = 5,
  timeout = 500,
) => {
  let currTries = 0;
  function innerFunc() {
    if (conditionFunc()) {
      executeFunc();
    } else if (currTries < numTries) {
      currTries += 1;
      setTimeout(innerFunc, timeout);
    }
  };
  innerFunc();
}
