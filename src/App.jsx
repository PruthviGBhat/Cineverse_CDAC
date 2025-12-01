import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Carousel from "./Carousel.jsx";
import CardComponent from "./CardComponent.jsx";
import MovieDetails from "./MovieDetails.jsx";
import Booking from "./Booking.jsx";
import SeatLayout from "./SeatLayout.jsx";
import Confirmation from "./Confirmation.jsx";
import NotFound from "./Errorpage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <CardComponent />
              </>
            }
          />

          {/* MOVIE DETAILS PAGE */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* BOOKING PAGE */}
          <Route path="/booking/:id" element={<Booking />} />

          {/* SEAT LAYOUT PAGE */}
          <Route path="/seat/:id" element={<SeatLayout />} />

          {/* CONFIRMATION PAGE */}
          <Route path="/confirmation" element={<Confirmation />} />

          {/* 404 PAGE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
