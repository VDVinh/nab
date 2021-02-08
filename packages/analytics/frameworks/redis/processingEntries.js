const cache = require('memory-cache');

const processingEntries = async ({ entries, controller }) => {
  if (!entries) return [];
  const data = entries[0][1];
  const activities = data.map(([id, ...fields]) => {
    const flatFields = fields.flat();
    return flatFields.reduce(
      (result, name, index) => {
        if (index % 2 === 0) result[name] = flatFields[index + 1];
        return result;
      },
      { id }
    );
  });
  activities.map((activity) => {
    if (!cache.get(activity.id)) {
      cache.put(activity.id, true, 100);
      process.nextTick(() => controller(activity));
    }
  });
  return activities;
};

module.exports = processingEntries;
