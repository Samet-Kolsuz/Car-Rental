import type { FC } from "react"
import Hero from "../../components/Hero"
import Filter from "../../components/filter"
import List from "../../components/list"
import { FilterProvider } from "../../context/filter"

const Home: FC = () => {
  return (
    <FilterProvider>
      <div>
        <Hero />
        <Filter />
        <List />
      </div>
    </FilterProvider>
  )
}

export default Home