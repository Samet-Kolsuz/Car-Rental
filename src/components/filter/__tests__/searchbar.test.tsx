import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Searchbar from '../searchbar'
import { FilterProvider } from '../../../context/filter'
import { fetchCars } from '../../../utils/service'

// Mock fetchCars
jest.mock('../../../utils/service', () => ({
  fetchCars: jest.fn()
}))

const mockCars = {
  results: [
    { make: 'Toyota', model: 'Corolla', year: '2020' },
    { make: 'Honda', model: 'Civic', year: '2021' },
    { make: 'Toyota', model: 'Camry', year: '2019' }
  ],
  total_count: 3
}

describe('Searchbar Component', () => {
  beforeEach(() => {
    (fetchCars as jest.Mock).mockResolvedValue(mockCars)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderSearchbar = () => {
    return render(
      <FilterProvider>
        <Searchbar />
      </FilterProvider>
    )
  }

  it('renders brand and model selects', () => {
    renderSearchbar()
    expect(screen.getByLabelText(/marka/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument()
  })

  it('loads brands on mount', async () => {
    renderSearchbar()
    await waitFor(() => {
      expect(fetchCars).toHaveBeenCalled()
    })
  })

  it('loads models when brand is selected', async () => {
    renderSearchbar()
    const brandSelect = screen.getByLabelText(/marka/i)
    
    await userEvent.click(brandSelect)
    await userEvent.click(screen.getByText('Toyota'))

    await waitFor(() => {
      expect(fetchCars).toHaveBeenCalledWith('Toyota')
    })
  })

  it('disables model select when no brand is selected', () => {
    renderSearchbar()
    const modelSelect = screen.getByLabelText(/model/i)
    expect(modelSelect).toBeDisabled()
  })
}) 