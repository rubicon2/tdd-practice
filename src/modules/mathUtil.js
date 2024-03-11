function checkIfAllNumbers(...args) {
  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] !== 'number') return false;
  }
  return true;
}

function clamp(min, max, value) {
  if (!checkIfAllNumbers(min, max, value))
    throw new Error('Arguments should be of type number');
  return Math.max(Math.min(value, max), min);
}

function lerp(min, max, t) {
  if (!checkIfAllNumbers(min, max, t))
    throw new Error('Arguments should be of type number.');
  return min + (max - min) * t;
}

function lerpClamp(min, max, t) {
  if (min > max) throw new Error('Min should be smaller than max.');
  return Math.max(Math.min(lerp(min, max, t), max), min);
}

function inverseLerp(min, max, value) {
  if (!checkIfAllNumbers(min, max, value))
    throw new Error('Arguments should be of type number.');
  return (value - min) / (max - min);
}

function inverseLerpClamp(min, max, value) {
  if (min > max) throw new Error('Min should be smaller than max.');
  return clamp(0, 1, inverseLerp(min, max, value));
}

module.exports = {
  checkIfAllNumbers,
  clamp,
  lerp,
  lerpClamp,
  inverseLerp,
  inverseLerpClamp,
};
