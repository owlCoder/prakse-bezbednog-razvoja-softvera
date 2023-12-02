import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Item from '../product/Item';
import { Popup } from '../main/Popup';
import Navbar from '../navigation/Navbar';
import LoadingSpinner from '../loading/loading';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';

function Store() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [popupData, setPopupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highestPrice, setHighestPrice] = useState(0);

  const navigate = useNavigate();

  const openPopup = (data) => {
    setOpen(true);
    setPopupData(data);
  };  

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

          const products = response.data.payload;
          const maxPrice = Math.max(...products.map((product) => product.price));
  
          setHighestPrice(maxPrice);
          setData(products);
        }

        setLoading(false);
      } catch (error) {
        navigate('/403');
      }
    };

    fetchData();
  }, [navigate]);

  const filteredData = data.filter((product) => {
    if (selectedGenres.length === 0) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return (
      product.genres.some((genre) => selectedGenres.includes(genre.id)) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredProducts = filteredData.map((product, index) => (
    <Item key={index} product={product} openPopup={openPopup} />
  ));

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
          <SearchBar onSearch={setSearchQuery} />
          {/* Filter and Items Container */}
          <div className="flex flex-col lg:flex-row lg:items-start">
            {/* Filter Sidebar */}
            <FilterSidebar setSelectedGenres={setSelectedGenres} maxPrice={highestPrice}/>
            {/* Items Container */}
            <div className="dark:bg-slate-800 flex flex-col basis-3/4 p-6 m-3 bg-gray-50 rounded-2xl md:rounded-none md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16 md:pt-0">
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
