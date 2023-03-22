import NameFilter from "./inputTextField";
import PriceFilter from "./inputNumberGroup";
import TagFilter from "./checkboxGroup";
import TypeFilter from "./radioGroup";
import PegiFilter from "./radioPegiGroup";
import { useSelector } from "react-redux";

import { FilterContextProvider } from "./filterContext";
import { useEffect, useState } from "react";
import { useFilter } from "./Filter";
import "../../style/form.css"

const FilterForm = ({onFilter }) => {
  const INITIAL_STATE = {
    name: "",
    range: { minVal: "", maxVal: "" },
    category: { fantasy: false, rpg: false, shooter: false, arcade: false },
    PGI: { "3": false, "7": false, "12": false, "16": false, "18": false },
    type: "All",
  };
 const {list: adverts} = useSelector((state)=> state.adverts) 
  const [filterParams, setFilterParams] = useState(INITIAL_STATE);
  const [filterAds, setFilterAds] = useState(useFilter(adverts, filterParams));
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
          <form className="signin-up-form" onSubmit={handleSubmit}>
            <h2>Filter</h2>
            <NameFilter />
            <TypeFilter />
            <PriceFilter />
            <TagFilter />
            <PegiFilter/>
          </form>
        </FilterContextProvider>
      </div>
    </div>
  );
};

export default FilterForm;
