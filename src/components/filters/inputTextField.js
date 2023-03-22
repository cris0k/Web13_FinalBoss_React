import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useFilterContext } from "./filterContext"

const NameFilter = () => {
  const { filterParams, setFilterParams } = useFilterContext()
  const [value, setValue] = useState(filterParams.name)
  const [t] = useTranslation("translation");

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, name: value }))
  }, [value, setFilterParams])

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  return (
    <label>
     {t("Busca por nombre:")}
      <br />
      <input className="filter_name" name="name-filter" onChange={handleChange} value={value} />
    </label>
  )
}

export default NameFilter
