// get random integer from 0 to max (max exclusive)
function getRandomInteger(max) {
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * max);
}

module.exports = { getRandomInteger };
