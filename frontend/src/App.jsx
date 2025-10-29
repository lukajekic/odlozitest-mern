import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Success from './pages/Success';
import Maintenance from './pages/Maintenance';
import Admin from './pages/Admin';
function App() {
  const [count, setCount] = useState(0)

  return (
<BrowserRouter>
<div><Toaster/></div>

<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/success' element={<Success/>} ></Route>
<Route path='/maintenance' element={<Maintenance/>}></Route>
<Route path='/admin' element={<Admin/>}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App
