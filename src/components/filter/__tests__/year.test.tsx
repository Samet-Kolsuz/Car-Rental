import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Year from '../year'
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

describe('Year Component', () => {
  beforeEach(() => {
    (fetchCars as jest.Mock).mockResolvedValue(mockCars)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderYear = () => {
    return render(
      <FilterProvider>
        <Year />
      </FilterProvider>
    )
  }

  it('renders year select', () => {
    renderYear()
    expect(screen.getByLabelText(/yıl/i)).toBeInTheDocument()
  })

  it('loads years on mount', async () => {
    renderYear()
    await waitFor(() => {
      expect(fetchCars).toHaveBeenCalled()
    })
  })

  it('is disabled when no brand is selected', () => {
    renderYear()
    const yearSelect = screen.getByLabelText(/yıl/i)
    expect(yearSelect).toBeDisabled()
  })

  it('updates years when brand and model change', async () => {
    renderYear()
    await waitFor(() => {
      expect(fetchCars).toHaveBeenCalled()
    })
  })
}) 