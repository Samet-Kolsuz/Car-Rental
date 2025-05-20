import { useEffect, useState, type FC } from "react"
import { fetchCars } from "../../utils/service"
import type { Car } from "../../types"
import Warning from "../warning"
import Card from "./card"
import { useFilter } from "../../context/filter"
import ReactPaginate from "react-paginate"

const ITEMS_PER_PAGE = 10

const List: FC = () => {
    const [cars, setCars] = useState<Car[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const { selectedBrand, selectedModel, selectedYear } = useFilter()

    useEffect(() => {
        const loadCars = async () => {
            try {
                // console.log('Loading cars with filters:', { selectedBrand, selectedModel, selectedYear })
                const data = await fetchCars(selectedBrand || undefined, selectedModel || undefined, selectedYear || undefined, page.toString())
                // console.log('Cars API Response:', data)
                
                if (data.results && data.results.length > 0) {
                    setCars(data.results)
                    setTotal(data.total_count)
                } else {
                    setCars([])
                    setTotal(0)
                }
            } catch (error) {
                // console.error('Error fetching cars:', error)
                setError(error instanceof Error ? error.message : 'Bir hata oluştu')
            }
        }

        loadCars()
    }, [selectedBrand, selectedModel, selectedYear, page])

    // Filtre değişince sayfa başa dönsün
    useEffect(() => {
        setPage(1)
    }, [selectedBrand, selectedModel, selectedYear])

    if (!cars) return <Warning>Loading...</Warning>
    if (error) return <Warning>{error}</Warning>
    if (cars.length < 1) return <Warning>Veri Bulunamadi</Warning>

    const pageCount = total ? Math.ceil(total / ITEMS_PER_PAGE) : 0

    return (
        <div className="padding-x max-width">
            <section className="home-cars-wrapper">
                {cars.map((car) => <Card key={car.id} car={car} />)}
            </section>
            {pageCount > 1 && (
                <div className="flex justify-center my-8">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={(selected) => setPage(selected.selected + 1)}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        forcePage={page - 1}
                        breakClassName={"break-me"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                    />
                </div>
            )}
        </div>
    )
}

export default List