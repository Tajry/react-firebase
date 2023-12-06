import { useState } from 'react'

import './App.css'
import Container from './Container'
import Login from './component/Login'
import { Route, Routes } from 'react-router-dom'
import Errorpage from './component/Errorpage'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/em/*' element={<Container/>} />
          <Route path='*' element={<Errorpage/>} />
      </Routes>
      
      
    </>
  )
}

export default App
