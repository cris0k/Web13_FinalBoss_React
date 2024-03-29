import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useFilterContext } from "./filterContext"

const PriceFilter = () => {
  const { filterParams, setFilterParams } = useFilterContext()
  const [values, setValues] = useState(filterParams.range)
  const [t] = useTranslation("translation");

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      range: values,
    }))
  }, [values, setFilterParams])

  const handleChange = (event) => {
    const { value, name } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <label>
      {t("Busca por rango de precios:")}{" "}
      <input
        className="filter_min"
        name="minVal"
        placeholder="Min"
        type="number"
        value={values.minVal}
        onChange={handleChange}
        min={0}
      />
      <input
        className="filter_max"
        name="maxVal"
        placeholder="Max"
        type="number"
        value={values.maxVal}
        onChange={handleChange}
        max={1000000}
      />
    </label>
  )
}

export default PriceFilter
