import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardComponent from './CardComponent.jsx'
import NotFound from './Errorpage.jsx'
import Navbar from './Navbar.jsx'
import Carousel from './Carousel.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MovieDetails from './MovieDetails.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import Booking from './Booking.jsx'
import Confirmation from './Confirmation.jsx'

function App() {
  

  return (
    <>
    <Navbar />
    {/* <Login /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<> 
            
            <Carousel />
            <CardComponent />
          </>} />
          <Route path='/MovieDetails' element={<MovieDetails />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/Confirmation' element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
