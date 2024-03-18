// import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'


export default function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}
