import React, { type FC, useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { fetchCars } from '../../utils/service'
import { useFilter } from '../../context/filter'

interface Brand {
  value: string
  label: string
}

interface Model {
  value: string
  label: string
}

const Searchbar: FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const { setSelectedBrand: setGlobalBrand, setSelectedModel: setGlobalModel } = useFilter()

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetchCars()
        const uniqueBrands = [...new Set(response.results.map(car => car.make))]
        const brandOptions = uniqueBrands.map(brand => ({
          value: brand,
          label: brand
        }))
        setBrands(brandOptions)
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    const fetchModels = async () => {
      if (selectedBrand) {
        try {
          const response = await fetchCars(selectedBrand.value)
          const uniqueModels = [...new Set(response.results.map(car => car.model))]
          const modelOptions = uniqueModels.map(model => ({
            value: model,
            label: model
          }))
          setModels(modelOptions)
        } catch (error) {
          console.error('Error fetching models:', error)
        }
      } else {
        setModels([])
      }
    }

    fetchModels()
  }, [selectedBrand])

  const handleBrandChange = (selectedOption: Brand | null) => {
    setSelectedBrand(selectedOption)
    setSelectedModel(null)
    setGlobalBrand(selectedOption?.value || null)
    setGlobalModel(null)
  }

  const handleModelChange = (selectedOption: Model | null) => {
    setSelectedModel(selectedOption)
    setGlobalModel(selectedOption?.value || null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className='searchbar flex gap-3 items-center justify-center'>
      <div className='searchbar-item items-end'>
        <div className='w-full flex flex-col'>
          <label htmlFor="brand">Marka</label>
          <ReactSelect
            className='w-full text-black'
            name='brand'
            id='brand'
            options={brands}
            placeholder="Select a brand"
            onChange={handleBrandChange}
            isClearable
          />
        </div>
        <button type="button" className='ml-3 sm:hidden cursor-pointer'>
          <img src="/search.svg" alt="search" className='size-[40px]' />
        </button>
      </div>

      <div className='searchbar-item flex flex-col !items-start'>
        <label htmlFor="model">Model</label>
        <div className='w-full flex'>
          <ReactSelect
            className='w-full text-black'
            name='model'
            id='model'
            options={models}
            placeholder="Select a model"
            onChange={handleModelChange}
            isClearable
            isDisabled={!selectedBrand}
            value={selectedModel}
          />
          <button type="submit" className='ml-3 cursor-pointer'>
            <img src="/search.svg" alt="search" className='size-[40px]' />
          </button>
        </div>
      </div>
    </form>
  )
}

export default Searchbar