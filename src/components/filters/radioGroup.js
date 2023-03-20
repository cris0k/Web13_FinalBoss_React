import { useEffect, useState } from "react";
import { useFilterContext } from "./filterContext";

const TypeFilter = () => {
  const { filterParams, setFilterParams } = useFilterContext();
  const [radioValue, setRadioValue] = useState(filterParams.type);

  useEffect(() => {
    setFilterParams((prevValues) => ({ ...prevValues, type: radioValue }));
  }, [radioValue, setFilterParams]);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value)

    setRadioValue(value);
  };

  return (
    <div>
      <span>Busca por tipo:</span>
      <br />
      <label>
        Venta
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
        Compra
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
        Todo
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
