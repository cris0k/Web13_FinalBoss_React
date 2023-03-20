import NameFilter from "./inputTextField";
import PriceFilter from "./inputNumberGroup";
import TagFilter from "./checkboxGroup";
import TypeFilter from "./radioGroup";
import { useSelector } from "react-redux";

import { FilterContextProvider } from "./filterContext";
import { useEffect, useState } from "react";
import { useFilter } from "./Filter";

const FilterForm = ({onFilter }) => {
  const INITIAL_STATE = {
    name: "",
    range: { minVal: "", maxVal: "" },
    category: { fantasy: false, rpg: false, shooter: false, arcade: false },
    type: "All",
  };
 const {list: adverts} = useSelector((state)=> state.adverts) 
  const [filterParams, setFilterParams] = useState(INITIAL_STATE);
  const [filterAds, setFilterAds] = useState(useFilter(adverts, filterParams));
console.log(filterAds)
  const filter = useFilter;
  useEffect(() => {
    setFilterAds(filter(adverts, filterParams));
  }, [filter, adverts, filterParams]);

  useEffect(() => {
    onFilter(filterAds);
  }, [onFilter, filterAds]);

  const handleSubmit = (event) => {
    event.preventDeffault();
  };

  return (
    <div className="form_container">
      <div className="form_inside">
        <FilterContextProvider value={{ filterParams, setFilterParams }}>
          <form onSubmit={handleSubmit}>
            <NameFilter />
            <TypeFilter />
            <PriceFilter />
            <TagFilter />
          </form>
        </FilterContextProvider>
      </div>
    </div>
  );
};

export default FilterForm;
