import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import logo from './assets/cineverse_logo1.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Yelahanka');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const navigate = useNavigate();

  const cities = [
    'Yelahanka', 'Whitefield', 'Koramangala', 'MG Road',
    'Indiranagar', 'Jayanagar', 'HSR Layout', 'Hebbal'
  ];

  // CHECK LOGIN
  const isLoggedIn = !!localStorage.getItem("cineverse_token");

  const handleLogout = () => {
    localStorage.removeItem("cineverse_token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Section - Logo + Search */}
          <div className="flex items-center gap-8">

            {/* ⭐ CLICKABLE LOGO (Go Home) ⭐ */}
            <Link to="/" className="flex w-50 h-10 items-center cursor-pointer">
              <img src={logo} alt="logo" className="h-full w-auto" />
            </Link>

            <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 w-96 focus-within:border-gray-400">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* City Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline">{selectedCity}</span>
                <ChevronDown size={16} className={`transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCityDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCityDropdown(false)}
                  ></div>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedCity === city ? 'text-pink-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* LOGIN / LOGOUT SECTION */}
            {!isLoggedIn ? (
              <button
                onClick={() => navigate('/login')}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 md:px-6 py-2 rounded text-sm font-medium transition-colors loginbtn"
              >
                Sign in
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 text-lg font-bold">👤</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 focus-within:border-gray-400">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
