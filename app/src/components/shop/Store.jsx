// Import necessary dependencies and libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Item from '../product/Item';
import { Popup } from '../main/Popup';
import Navbar from '../navigation/Navbar';
import LoadingSpinner from '../loading/loading';
import FilterSidebar from './FilterSidebar';

// Define the Store component
function Store() {
  // State for the popup
  const [open, setOpen] = useState(false);
  // State for product data
  const [data, setData] = useState([]);
  // State for popup data
  const [popupData, setPopupData] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for selected genres
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Navigation hook
  const navigate = useNavigate();

  // Function to open the popup
  const openPopup = (data) => {
    setOpen(true);
    setPopupData(data);
  };

  // Effect to fetch product data from the API
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(global.APIEndpoint + '/api/product/get', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setData(response.data.payload);
        }

        setLoading(false);
      } catch (error) {
        navigate('/403');
      }
    };

    fetchData();
  }, [navigate]);

  // Filter the data based on selected genres
  const filteredData = data.filter((product) => {
    // If no genres are selected, display all products
    if (selectedGenres.length === 0) {
      return true;
    }

    // Check if the product has any selected genres
    return product.genres.some((genre) => selectedGenres.includes(genre.id));
  });

  // Map over the filtered data
  const filteredProducts = filteredData.map((product, index) => (
    <Item key={index} product={product} openPopup={openPopup} />
  ));

  // Render the Store component
  return loading ? (
    <LoadingSpinner />
  ) : data != null ? (
    <div className="bg-gray-100 dark:bg-slate-800 dark:text-white min-h-screen pb-5">
      {open ? (
        <Popup data={popupData} closePopup={() => setOpen(false)} />
      ) : (
        <div></div>
      )}
      <Navbar />
      <div className="min-h-screen mt-20">
        <section>
          {/* Heading */}
          {/* ... (unchanged) */}

          {/* Filter and Items Container */}
          <div className="flex flex-col lg:flex-row lg:items-start">
            {/* Filter Sidebar */}
            <FilterSidebar setSelectedGenres={setSelectedGenres} />

            {/* Items Container */}
            <div className="dark:bg-slate-800 flex flex-col basis-3/4 p-6 m-3 bg-gray-50 rounded-2xl md:rounded-none md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
              {/* Grid Container */}
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts
                ) : (
                  <p>No products match the selected genres.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Store;
