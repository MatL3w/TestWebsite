
export const modulePattern = (function () {
  const x = 23;
  const giveMeX = function () {
    return x;
  };
  return {
    giveMeX,
  };
})();
