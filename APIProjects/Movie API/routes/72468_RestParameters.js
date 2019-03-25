function factorial(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous * current;
  });
}

function summation(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

module.exports = {
  factorial,
  summation,
};
