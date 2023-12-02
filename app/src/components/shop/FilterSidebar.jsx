// FilterSidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterSidebar = ({ setSelectedGenres, maxPrice }) => {
  const [priceRange, setLocalPriceRange] = useState([0, maxPrice]);
  const [genres, setGenres] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          global.APIEndpoint + '/api/genre/get',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setGenres(response.data.payload);
        }
      } catch (error) {
        // Handle error, e.g., navigate to an error page
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const response = await axios.get(
          global.APIEndpoint + '/api/product/get',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const products = response.data.payload;

          // Find the highest price
          const maxPrice = Math.max(...products.map((product) => product.price));

          // Set the highest price in state
          setHighestPrice(maxPrice);
        }
      } catch (error) {
        // Handle error, e.g., navigate to an error page
        console.error('Error fetching max price:', error);
      }
    };

    fetchMaxPrice();
  }, []);

  const handlePriceChange = (newRange) => {
    setLocalPriceRange(newRange);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre.id)
        ? prevGenres.filter((selectedGenre) => selectedGenre !== genre.id)
        : [...prevGenres, genre.id]
    );
  };

  return (
    <div className="sticky top-20 h-full max-h-screen overflow-y-auto bg-gray-200 p-4 hidden lg:flex flex-col w-1/4 dark:bg-slate-900 divide-y divide-solid rounded-2xl ml-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Price Range Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Price Range
        </label>
        <div className="mt-1">
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={1}
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceChange([priceRange[0], parseInt(e.target.value, 10)])
            }
            className="w-full"
          />
          <div className="flex justify-between">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Genre Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Genres
        </label>
        <div className="mt-2 space-y-2">
          {genres.map((genre) => (
            <div key={genre.id} className="flex items-center">
              <input
                type="checkbox"
                id={genre.id}
                onChange={() => handleGenreChange(genre)}
                className="mr-2"
              />
              <label htmlFor={genre.id} className="text-sm">
                {genre.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
