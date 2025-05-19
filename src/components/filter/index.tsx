import type { FC } from "react"
import Searchbar from "./searchbar"
import Year from "./year"


const Filter:FC = () => {
  return (
    <div className="mt-12 padding-x padding-y max-width">
        <div className="home-text-container">
            <h1 className="text-4xl font-extrabold">Araba Katologu</h1>
            <p className="">Begenebilcegin arabalari kesfet</p>
        </div>
        <div className="home-filters">
            <Searchbar/>
            <div className="home-filters-container">
                <Year/>
            </div>
        </div>
    </div>
  )
}

export default Filter