import { render, screen, waitFor } from '@testing-library/react'
import List from '../index'
import { FilterProvider } from '../../../context/filter'
import { fetchCars } from '../../../utils/service'

// Mock fetchCars
jest.mock('../../../utils/service', () => ({
  fetchCars: jest.fn()
}))

const mockCars = {
  results: [
    { id: 1, make: 'Toyota', model: 'Corolla', year: '2020' },
    { id: 2, make: 'Honda', model: 'Civic', year: '2021' },
    { id: 3, make: 'Toyota', model: 'Camry', year: '2019' }
  ],
  total_count: 3
}

describe('List Component', () => {
  beforeEach(() => {
    (fetchCars as jest.Mock).mockResolvedValue(mockCars)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderList = () => {
    return render(
      <FilterProvider>
        <List />
      </FilterProvider>
    )
  }

  it('renders loading state initially', () => {
    renderList()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders cars after loading', async () => {
    renderList()
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })
    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
  })

  it('renders error message when fetch fails', async () => {
    (fetchCars as jest.Mock).mockRejectedValue(new Error('Failed to fetch'))
    renderList()
    await waitFor(() => {
      expect(screen.getByText(/bir hata oluştu/i)).toBeInTheDocument()
    })
  })

  it('renders no data message when no cars found', async () => {
    (fetchCars as jest.Mock).mockResolvedValue({ results: [], total_count: 0 })
    renderList()
    await waitFor(() => {
      expect(screen.getByText(/veri bulunamadi/i)).toBeInTheDocument()
    })
  })
}) 