import React, { createContext, useContext, useState, type FC, type ReactNode } from 'react'

interface FilterContextType {
  selectedBrand: string | null
  selectedModel: string | null
  selectedYear: string | null
  setSelectedBrand: (brand: string | null) => void
  setSelectedModel: (model: string | null) => void
  setSelectedYear: (year: string | null) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  return (
    <FilterContext.Provider
      value={{
        selectedBrand,
        selectedModel,
        selectedYear,
        setSelectedBrand,
        setSelectedModel,
        setSelectedYear
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
} 