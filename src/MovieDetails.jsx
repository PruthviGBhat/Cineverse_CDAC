import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import api from "./apiClient";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!id) return;
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      const res = await api.get(`/api/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Error loading movie:", err);
    }
  };

  if (!movie)
    return <div className="p-10 text-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Background Banner */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-25">
          <img 
            src={movie.posterUrl} 
            alt="" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-xl mx-auto md:mx-0"
            />

            {/* Movie Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-3 mb-4">
                <Star size={22} className="fill-red-500 text-red-500" />
                <span className="text-xl font-semibold">{movie.rating}/10</span>
              </div>

              <p className="text-gray-300 text-lg mb-2">
                <strong>Genre:</strong> {movie.genre}
              </p>

              <p className="text-gray-300 text-lg mb-2">
                <strong>Language:</strong> {movie.language}
              </p>

              <p className="text-gray-300 text-lg mb-2">
                <strong>Duration:</strong> {movie.durationMinutes} minutes
              </p>

              <p className="text-gray-300 text-lg mb-2">
                <strong>Release Date:</strong> {movie.releaseDate}
              </p>

              {/* Book Button */}
              <Link
                to={`/booking/${movie.id}`}
                className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-semibold"
              >
                Book Tickets
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movie.cast?.map((actor, index) => (
            <div key={index} className="text-center bg-white p-4 rounded-lg shadow">
              <div className="w-20 h-20 mx-auto mb-2 bg-gray-200 rounded-full"></div>
              <p className="font-semibold text-gray-800 text-sm">{actor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back & Book Buttons */}
      <div className="flex justify-center gap-6 py-6 mb-10">
        <Link
          to={`/booking/${movie.id}`}
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-bold"
        >
          Book Tickets
        </Link>

        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-800 text-white px-10 py-3 rounded-lg font-bold"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
