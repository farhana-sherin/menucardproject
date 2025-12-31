import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS } from "../data/menu";

const CATEGORIES = ["All", ...new Set(MENU_ITEMS.map(item => item.category))];
const TYPES = ["All", "veg", "non-veg"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");

  const filteredItems = MENU_ITEMS.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const typeMatch = activeType === "All" || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg shadow-orange-500/20">
            <div className="bg-black rounded-full p-4">
              <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            OUR MENU
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Experience a symphony of flavors crafted with passion and served with excellence.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="max-w-7xl w-full mb-12 flex flex-col items-center space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-orange-500/30 hover:text-white"
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Type Toggle */}
          <div className="flex bg-gray-900/80 p-1 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${activeType === type
                    ? "bg-gray-800 text-orange-400 shadow-sm"
                    : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                {type === 'veg' ? 'Veg 🌱' : type === 'non-veg' ? 'Non-Veg 🍗' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="max-w-7xl w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-500/10 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Bestseller Badge */}
                {item.isBestseller && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    BESTSELLER
                  </div>
                )}

                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-video shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <div className={`w-3 h-3 rounded-full border-2 ${item.type === 'veg' ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                  </div>
                  <span className="text-xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700/50">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <button className="p-2 rounded-full bg-gray-800 text-white hover:bg-orange-500 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No items found for this selection.</p>
            <button
              onClick={() => { setActiveCategory('All'); setActiveType('All') }}
              className="mt-4 text-orange-400 hover:text-orange-300 underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm">© 2025 Premium Menu. All Rights Reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
