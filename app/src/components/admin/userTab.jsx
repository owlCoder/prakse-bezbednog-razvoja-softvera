import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const UsersTab = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('firstName');
  const [ascDesc, setAscDesc] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        const token = await currentUser.getIdToken();
        const response = await axios.post(
          global.APIEndpoint + '/api/user/get', // Adjust the API endpoint for fetching user data
          {
            uid: currentUser.uid,
          },
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setData(response.data.payload);
        setLoading(false);

        if (response.status !== 200) navigate('/' + response.status.toString());
      } catch (error) {
        navigate('/403');
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleSortBy = (key) => {
    if (key === 'enabled') {
      if (key === sortBy) {
        setAscDesc(!ascDesc);
      } else {
        setSortBy(key);
        setAscDesc(true);
      }
    } else {
      if (key === sortBy) {
        setAscDesc(!ascDesc);
      } else {
        setSortBy(key);
        setAscDesc(true);
      }
    }
  };

  let sortedData = data;

  if (sortedData) {
    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      sortedData = sortedData.filter((user) =>
        user.firstName.toLowerCase().includes(lowerCaseQuery) ||
        user.lastName.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (sortBy === 'enabled') {
      sortedData = sortedData.sort((a, b) => {
        if (ascDesc) {
          return a.disabled - b.disabled;
        } else {
          return b.disabled - a.disabled;
        }
      });
    } else {
      sortedData = sortedData.sort((a, b) => {
        if (sortBy === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return ascDesc ? dateA - dateB : dateB - dateA;
        } else {
          return ascDesc
            ? a[sortBy].localeCompare(b[sortBy]) // Ascending
            : b[sortBy].localeCompare(a[sortBy]); // Descending
        }
      });
    }
  }

  return loading === true ? (
    <LoadingSpinner />
  ) : data !== null ? (
    <div className="p-4 bg-white dark:bg-slate-800 bg-opacity-60 rounded-lg shadow-lg mx-6 my-4">
      <p className="text-gray-700 dark:text-gray-200 mb-6 ml-1 my-2 text-center font-medium" style={{ fontSize: 17.5 }}>
      As an admin, you have access to powerful tools and features to manage user profiles. 
      Explore the user data, utilize sorting and search capabilities to quickly find the information 
      you need. You can also take various actions on user profiles, such as editing details, 
      deleting accounts, resetting passwords, and changing user roles. <br />
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
         {/* Search Bar */}
         <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 mb-4 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ outline: 'none' }}
        />
        <table className="w-full text-md text-left text-black dark:text-white">
          <thead className="text-md text-white uppercase bg-primary-900 opacity-80">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('firstName')}
              >
                First Name{' '}
                {sortBy === 'firstName' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('lastName')}
              >
                Last Name{' '}
                {sortBy === 'lastName' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('email')}
              >
                Email{' '}
                {sortBy === 'email' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('date')}
              >
                Birthday{' '}
                {sortBy === 'date' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('role')}
              >
                Role{' '}
                {sortBy === 'role' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy('enabled')}
              >
                Account Status{' '}
                {sortBy === 'enabled' ? (
                  ascDesc ? (
                    <FiArrowUp className="inline" />
                  ) : (
                    <FiArrowDown className="inline" />
                  )
                ) : <div></div>}
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user) => (
              <tr
                className="bg-white border-1 border-b-gray-950 dark:bg-gray-900 dark:border-gray-700"
                key={user.uid}
              >
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {/* Date */}
                  {new Date(user.date).toLocaleDateString('en-GB').replace(/\//g, '.')}
                </td>
                <td className="px-6 py-4 font-medium">
                  {user.role.toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  {!user.disabled ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="crimson" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg> 
}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {/* Buttons for Edit, Delete, Reset Password, and Change Role */}
                    <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">Edit</button>
                    <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900">Delete</button>
                    <button className="px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-900">Reset Password</button>
                    <button className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900">Change Role</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default UsersTab;
