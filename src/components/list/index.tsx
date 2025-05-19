import { useEffect, useState, type FC } from "react"
import { fetchCars } from "../../utils/service"
import type { Car } from "../../types"
import Warning from "../warning"
import Card from "./card"


const List:FC = () => {
    const [cars, setCars] = useState<Car[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    useEffect(()=>{
        fetchCars()
        .then((data)=> {
            setCars(data.results);
            setTotal(data.total_count);
        })
        .catch((error) => {
            setError(error.message);
        });
    },[]);
    // 1 egerki cars null ise henuz api den cevap gelmemistir
    if(!cars) return <Warning>Loading...</Warning>

    // eger error varsa
    if(error) return <Warning>{error}</Warning>;
    //cars bos dizi ise
    if(cars.length < 1) return <Warning>Veri Bulunamadi</Warning>;

    // cars dolu diziyse eger apidan veriler gelmistir.
  return (
    <div className="padding-x max-width">
        <section className="home-cars-wrapper">
            {cars.map((car,i) => <Card key={car.id} car={car}/>)}
        </section>
    </div>
  )
}

export default List