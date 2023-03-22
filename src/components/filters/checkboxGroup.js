import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFilterContext } from "./filterContext";
const categories = ["fantasy", "rpg", "shooter", "arcade"];

const TagFilter = () => {
  const [tags] = useState(categories);
  const { filterParams, setFilterParams } = useFilterContext();
  const [chosen, setChosen] = useState(filterParams.category);
  const [t] = useTranslation("translation");

  useEffect(() => {
    setFilterParams((prevValues) => ({ ...prevValues, category: chosen }));
  }, [setFilterParams, chosen]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setChosen((prev) => ({ ...prev, [value]: checked }));
  };

  return (
    <div>
      {t("Category : ")}{" "}
      {tags.map((tag, index) => (
        <label key={index}>
          {tag}
          <input
            className="filter_check"
            type="checkbox"
            value={tag}
            onChange={handleChange}
            checked={chosen[tag]}
          />
        </label>
      ))}
    </div>
  );
};

export default TagFilter;
