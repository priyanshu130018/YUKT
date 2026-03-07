export const buildCategoryStats = (toolUsage = {}, tools = []) => {
  const stats = {};
  tools.forEach(t => {
    if (!stats[t.category]) stats[t.category] = 0;
    stats[t.category] += toolUsage[t.id] || 0;
  });
  return stats;
};

export const getTopTools = (toolUsage = {}, tools = [], limit = 5) => {
  return Object.entries(toolUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, count]) => ({ tool: tools.find(t => t.id === id), count }))
    .filter(({ tool }) => tool);
};

export const getTotalUsage = (toolUsage = {}) =>
  Object.values(toolUsage).reduce((sum, v) => sum + v, 0);
