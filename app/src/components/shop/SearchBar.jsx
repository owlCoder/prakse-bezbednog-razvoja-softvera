// SearchBar.js

import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchClick = () => {
    // Implement search functionality as needed
    // You can trigger the search when the user clicks the search button
    // For now, it's just a placeholder
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex items-center justify-center mb-8 mx-6">
      <div className="max-w-2xl w-full">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <button
        className="new-account-button ml-2 px-4 py-2 text-white bg-primary-700 hover:bg-primary-800 focus-ring-4 focus-ring-primary-300 font-medium rounded-lg"
        style={{ fontSize: 16, fontWeight: '600' }}
        onClick={handleSearchClick}
      >
        <AiOutlineSearch className="plus-icon" />
        &nbsp;Search
      </button>
    </div>
  );
};

export default SearchBar;
