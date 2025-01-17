export const addKeyForList = (list, key) =>
  list.map((item, index) => {
    return { ...item, key: `${list[key]}-${index}` };
  });

addKeyForList;

/**
 * Sorts an array of objects based on a specified key, handling both string and number values.
 * For strings, performs a natural sort. For numbers, sorts numerically (in descending order).
 * @param {Array} arr - The array to be sorted
 * @param {string} key - The key used for sorting
 */
export const customSortList = (arr, key) =>
  arr.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (typeof valueA === "string")
      return valueA.localeCompare(valueB, undefined, { numeric: true });
    else if (typeof valueA === "number") return valueB - valueA;
    else return 0;
  });
