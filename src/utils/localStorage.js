export const getItem = (key, fallback = null) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch { return fallback; }
};

export const setItem = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

export const removeItem = (key) => {
  try { localStorage.removeItem(key); } catch {}
};

export const clearAll = () => {
  try { localStorage.clear(); } catch {}
};
