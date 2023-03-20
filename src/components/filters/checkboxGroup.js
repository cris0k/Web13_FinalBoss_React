import { useState, useEffect } from "react";
// import { getTags } from "../auth/service";
import { useFilterContext } from "./filterContext";
const categories = ["fantasy", "rpg", "shooter", "arcade"];

const TagFilter = () => {
  const [tags] = useState(categories);
  const { filterParams, setFilterParams } = useFilterContext();
  const [chosen, setChosen] = useState(filterParams.category);
  // useEffect(() => {
  //   // getTags()
  //   //   .then(setTags)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    setFilterParams((prevValues) => ({ ...prevValues, category: chosen }));
  }, [setFilterParams, chosen]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setChosen((prev) => ({ ...prev, [value]: checked }));
  };

  return (
    <div>
      Busca por tags:{" "}
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
