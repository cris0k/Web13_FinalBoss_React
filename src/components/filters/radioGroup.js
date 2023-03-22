import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFilterContext } from "./filterContext";

const TypeFilter = () => {
  const { filterParams, setFilterParams } = useFilterContext();
  const [radioValue, setRadioValue] = useState(filterParams.type);
  const [t] = useTranslation("translation");

  useEffect(() => {
    setFilterParams((prevValues) => ({ ...prevValues, type: radioValue }));
  }, [radioValue, setFilterParams]);

  const handleChange = (event) => {
    const value = event.target.value;

    setRadioValue(value);
  };

  return (
    <div>
      <label>
        {t("Venta")}
        <input
          className="filter_sell"
          type="radio"
          name="type-filter"
          onChange={handleChange}
          value="sale"
          checked={radioValue === "sale"}
        />
      </label>{" "}
      <label>
        {t("Compra")}
        <input
          className="filter_buy"
          type="radio"
          name="type-filter"
          onChange={handleChange}
          value="buy"
          checked={radioValue === "buy"}
        />
      </label>{" "}
      <label>
        {t("Todo")}
        <input
          className="filter_all"
          type="radio"
          name="type-filter"
          onChange={handleChange}
          value="All"
          checked={radioValue === "All"}
        />
      </label>
    </div>
  );
};

export default TypeFilter;
