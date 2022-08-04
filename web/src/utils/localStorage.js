export const setJsonToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getJsonFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
