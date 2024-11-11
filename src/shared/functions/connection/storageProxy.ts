export const setItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getItem = (key: string) => localStorage.getItem(key);

export const getItemParse = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
};

export const removeItem = (key: string) => localStorage.removeItem(key);
