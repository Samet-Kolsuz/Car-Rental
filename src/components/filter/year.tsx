import { type FC, useEffect, useState } from "react"
import ReactSelect from 'react-select'
import { fetchCars } from "../../utils/service"
import { useFilter } from "../../context/filter"

interface Year {
  value: string
  label: string
}

const Year: FC = () => {
  const [years, setYears] = useState<Year[]>([])
  const [selectedYear, setSelectedYear] = useState<Year | null>(null)
  const { selectedBrand, selectedModel, setSelectedYear: setGlobalYear } = useFilter()

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetchCars(selectedBrand || undefined, selectedModel || undefined)
        const uniqueYears = [...new Set(response.results.map(car => car.year))]
        const yearOptions = uniqueYears
          .filter(year => year)
          .sort((a, b) => Number(b) - Number(a))
          .map(year => ({
            value: year.toString(),
            label: year.toString()
          }))
        setYears(yearOptions)
        
        if (selectedYear && !yearOptions.some(y => y.value === selectedYear.value)) {
          setSelectedYear(null)
          setGlobalYear(null)
        }
      } catch (error) {
        console.error('Error fetching years:', error)
      }
    }

    fetchYears()
  }, [selectedBrand, selectedModel, selectedYear, setGlobalYear])

  const handleYearChange = (selectedOption: Year | null) => {
    setSelectedYear(selectedOption)
    setGlobalYear(selectedOption?.value || null)
  }

  return (
    <div className='searchbar-item flex flex-col !items-start'>
      <label htmlFor="year">Yıl</label>
      <div className='w-full flex'>
        <ReactSelect
          className='w-full text-black'
          name='year'
          id='year'
          options={years}
          placeholder="Select a year"
          onChange={handleYearChange}
          isClearable
          value={selectedYear}
          isDisabled={!selectedBrand}
        />
      </div>
    </div>
  )
}

export default Year