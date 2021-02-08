const pick = (obj, keys) => {
  if (!(obj && keys)) return {};
  return Object.keys(obj).reduce((result, key) => {
    if (keys.includes(key)) result[key] = obj[key];
    return result;
  }, {});
};
module.exports = pick;
