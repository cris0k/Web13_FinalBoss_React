export const useFilter = (adverts, { name, range, category, type, PGI }) => {
  const filtered = adverts
    .filter(filterByName(name))
    .filter(filterByPrice(range))
    .filter(filterByTags(category))
    .filter(filterByType(type))
    .filter(filterByPegi(PGI));

  return filtered;
};
const filterByName =
  (param) =>
  ({ name }) => {
    if (param === "") return true;
    return name.includes(param);
  };

const filterByPrice =
  ({ minVal, maxVal }) =>
  ({ price }) => {
    if (minVal === "" && maxVal === "") return true;
    if (minVal <= price && maxVal === "") return true;
    if (minVal === "" && price <= maxVal) return true;

    return price >= minVal && price <= maxVal;
  };

const filterByTags =
  (chosenTags) =>
  ({ category }) => {
    const filterTags = [];
    for (const [key, value] of Object.entries(chosenTags)) {
      if (value === true) filterTags.push(key);
    }
    const categories = category.join().split(",");

    if (filterTags.length === 0) return true;
    return filterTags.every((tag) => categories.includes(tag));
  };
const filterByPegi =
  (chosenTags) =>
  ({ PGI }) => {
    const filterTags = [];
    for (const [key, value] of Object.entries(chosenTags)) {
      if (value === true) filterTags.push(key);
    }

    const pegi = PGI.toString();
    if (filterTags.length === 0) return true;
    return filterTags.every((tag) => pegi.includes(tag));
  };

const filterByType =
  (filterParam) =>
  ({ sale }) => {
    sale === "buy" ? (sale = true) : (sale = false);

    let condition = false;
    if (filterParam === "All") return true;
    filterParam === "buy" ? (condition = true) : (condition = false);

    return condition === sale;
  };
