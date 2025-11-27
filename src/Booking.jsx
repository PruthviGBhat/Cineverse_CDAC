import React, { useState } from "react";
// import logo from "../assets/Untitled_design__4_-removebg-preview.png"; 
const dates = [
  "Tue 11 Nov","Wed 12 Nov","Thu 13 Nov","Fri 14 Nov","Sat 15 Nov","Sun 16 Nov","Mon 17 Nov"
];

const theatresSeed = [
  {
    id: 1,
    name: "PVR: Orion Mall, Dr Rajkumar Road",
    tags: ["Cancellation available"],
    shows: [
      { time: "09:20 AM", badge: "ATMOS", status: "available" },
      { time: "10:20 AM", badge: "GOLD", status: "available" },
      { time: "01:10 PM", badge: "", status: "available" },
      { time: "03:45 PM", badge: "", status: "available" },
      { time: "07:15 PM", badge: "GOLD", status: "available" },
      { time: "10:30 PM", badge: "", status: "available" }
    ]
  },
  {
    id: 2,
    name: "PVR: Superplex Forum Mall, Kanakapura Road",
    tags: ["Cancellation available"],
    shows: [
      { time: "10:00 AM", badge: "", status: "available" },
      { time: "01:25 PM", badge: "LUXE", status: "fast" },
      { time: "04:00 PM", badge: "", status: "available" },
      { time: "07:10 PM", badge: "LUXE", status: "available" },
      { time: "09:45 PM", badge: "", status: "available" }
    ]
  },
  {
    id: 3,
    name: "Cinepolis: Nexus Shantiniketan, Bengaluru",
    tags: ["Cancellation available"],
    shows: [
      { time: "10:30 AM", badge: "DOLBY 7.1", status: "fast" },
      { time: "04:05 PM", badge: "DOLBY 7.1", status: "available" },
      { time: "10:25 PM", badge: "DOLBY 7.1", status: "available" }
    ]
  }
];

export default function TheatreServices() {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [fav, setFav] = useState([]);
  const toggleFav = (id) => {
    setFav(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top nav (simple) */}
      

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Movie title + meta */}
        <section className="bg-gray-50 rounded shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">The Girlfriend - (Telugu)</h1>
          <div className="flex flex-wrap gap-3 mt-3 items-center">
            <span className="text-sm px-3 py-1 border rounded-full text-gray-600">Movie runtime: 2h 18m</span>
            <span className="text-sm px-3 py-1 border rounded-full text-gray-600">UA13+</span>
            <span className="text-sm px-3 py-1 border rounded-full text-gray-600">Drama</span>
            <span className="text-sm px-3 py-1 border rounded-full text-gray-600">Romantic</span>
          </div>
        </section>

        {/* date picker + filters row */}
        <section className="bg-gray-50 rounded shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dates.map(d => (
                <button
                  key={d}
                  onClick={()=>setSelectedDate(d)}
                  className={`min-w-[120px] text-left px-4 py-2 rounded-lg border ${
                    selectedDate===d ? "bg-[#b71c1c] text-white border-[#b71c1c]" : "bg-white text-[#4b5563] border-gray-200"
                  }`}
                >
                  <div className="text-xs opacity-80">{d.split(" ")[0]}</div>
                  <div className="font-semibold">{d.split(" ")[1]} {d.split(" ")[2]}</div>
                </button>
              ))}
            </div>

            <div className="flex-1 flex gap-3 ml-auto">
              <select className="border px-3 py-2 rounded w-40 text-sm">
                <option>Telugu - 2D</option>
                <option>English - 2D</option>
              </select>
              <select className="border px-3 py-2 rounded w-40 text-sm">
                <option>Price Range</option>
                <option>₹0 - ₹300</option>
              </select>
              <select className="border px-3 py-2 rounded w-44 text-sm">
                <option>Preferred Time</option>
                <option>Morning</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
        </section>

        {/* legend */}
        <div className="flex gap-4 items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-600 inline-block" /> AVAILABLE</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> FAST FILLING</div>
        </div>

        {/* Theatres list */}
        <section className="space-y-4">
          {theatresSeed.map(t => (
            <div key={t.id} className="bg-gray-50 rounded shadow p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center text-xl font-bold text-[#b71c1c]">
                  PVR
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={()=>toggleFav(t.id)}
                        className={`p-2 rounded-full ${fav.includes(t.id) ? "text-[#b71c1c] bg-[#feecee]" : "text-gray-400 hover:text-[#b71c1c]"}`}
                        aria-label="favorite"
                      >
                        {fav.includes(t.id) ? "♥" : "♡"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {t.shows.map((s, i) => (
                      <button
                        key={i}
                        className={
                          `px-4 py-2 rounded border font-medium text-sm 
                          ${s.status==="available" ? "border-green-600 text-green-700 hover:bg-green-50" : ""} 
                          ${s.status==="fast" ? "border-amber-500 text-amber-700 hover:bg-amber-50" : ""} 
                          ${s.badge ? "relative" : ""}`
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span>{s.time}</span>
                          {s.badge && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{s.badge}</span>}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* meta */}
                  <div className="mt-4 text-sm text-gray-500">
                    {t.tags.join(" • ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}