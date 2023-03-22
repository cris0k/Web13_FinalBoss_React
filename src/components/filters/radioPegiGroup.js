import { useState, useEffect } from "react";
import { useFilterContext } from "./filterContext";

const pegies = ["3", "7", "12", "16", "18"];

const PegiFilter = () => {
  const [tags] = useState(pegies);
  const { filterParams, setFilterParams } = useFilterContext();
  const [chosen, setChosen] = useState(filterParams.PGI);

  useEffect(() => {
    setFilterParams((prevValues) => ({ ...prevValues, PGI: chosen }));
  }, [setFilterParams, chosen]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const newChosen = { ...chosen };
    if (checked) {
      for (const tag in newChosen) {
        if (tag !== value) {
          newChosen[tag] = false;
        }
      }
      newChosen[value] = true;
    } else {
      newChosen[value] = false;
    }
    setChosen(newChosen);
  };

  return (
    <div>
      Pegi :{" "}
      {tags.map((tag, index) => (
        <label key={index}>
          {tag}
          <input
            className="filter_check"
            name="type-filter"
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

export default PegiFilter;