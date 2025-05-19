import type { FC } from "react"
import Hero from "../../components/Hero"
import Filter from "../../components/filter"
import List from "../../components/list"


const Home:FC = () => {
  return (
    <div>
      <Hero/>
      <Filter/>
      <List/>
    </div>
  )
}

export default Home