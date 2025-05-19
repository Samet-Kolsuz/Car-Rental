import type { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"


const App:FC = () => {
  return (
   <BrowserRouter>
   <div className="min-h-screen bg-dark-gary text-white">
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App