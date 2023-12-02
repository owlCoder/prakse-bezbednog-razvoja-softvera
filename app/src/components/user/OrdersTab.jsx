import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const OrdersTab = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
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
                    global.APIEndpoint + '/api/order/getOrdersPerBuyer',
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
                console.log(response.data.payload)
                setLoading(false);

                if (response.status !== 200) 
                    navigate('/' + response.status.toString());
            } catch (error) {
                console.log(error)
                navigate('/403');
            }
        };

        fetchData();
    }, [currentUser, navigate]);
  
    // sorting
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
            sortedData = sortedData.filter((product) =>
                product.author.toLowerCase().includes(lowerCaseQuery) ||
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.quantity.toLowerCase().includes(lowerCaseQuery) ||
                product.price.toLowerCase().includes(lowerCaseQuery)
            );
        }

        if (sortBy === 'used') {
            sortedData = sortedData.sort((a, b) => {
                // Convert 'true' to 1 and 'false' to 0
                const valueA = a.used ? 1 : 0;
                const valueB = b.used ? 1 : 0;

                if (ascDesc) {
                    return valueA - valueB;
                } else {
                    return valueB - valueA;
                }
            });
        }
        else if (sortBy === 'price') {
            sortedData = sortedData.sort((a, b) => {
                const priceA = parseFloat(a.price);
                const priceB = parseFloat(b.price);

                return ascDesc ? priceA - priceB : priceB - priceA;
            });
        } else if (sortBy === 'quantity') {
            sortedData = sortedData.sort((a, b) => {
                const quantityA = parseInt(a.quantity);
                const quantityB = parseInt(b.quantity);

                return ascDesc ? quantityA - quantityB : quantityB - quantityA;
            });
        } else {
            sortedData = sortedData.sort((a, b) => {
                if (sortBy === 'date') {
                    const dateA = new Date(a.dateValidity);
                    const dateB = new Date(b.dateValidity);
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
                Explore the product data, utilize sorting and search capabilities to quickly find the information
                you need. You can also take various actions on products, such as editing details,
                deleting products, and performing sort operations. <br />
            </p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search products..."
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
                                className="px-6 py-3"
                            >
                                Product Picture{' '}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={() => handleSortBy('name')}
                            >
                                Name{' '}
                                {sortBy === 'name' ? (
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
                                onClick={() => handleSortBy('price')}
                            >
                                Price{' '}
                                {sortBy === 'price' ? (
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
                                onClick={() => handleSortBy('quantity')}
                            >
                                Quantity{' '}
                                {sortBy === 'quantity' ? (
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
                                onClick={() => handleSortBy('productionYear')}
                            >
                                Production Year{' '}
                                {sortBy === 'productionYear' ? (
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
                            >
                                Genres{' '}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={() => handleSortBy('used')}
                            >
                                Is New{' '}
                                {sortBy === 'used' ? (
                                    ascDesc ? (
                                        <FiArrowUp className="inline" />
                                    ) : (
                                        <FiArrowDown className="inline" />
                                    )
                                ) : <div></div>}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manage Product
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {sortedData.map((order) => (
                            <tr
                                className="bg-white border-1 border-b-gray-950 dark:bg-gray-900 dark:border-gray-700"
                                key={order.uid}
                            >
                                <td className="px-6 py-4 font-medium">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="h-16 w-16"
                                            src={order.product.photoBase64}
                                            alt="pi"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.quantity}</td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {new Date(product.productionYear).toLocaleDateString('en-GB').replace(/\//g, '.')}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {product.genres.map((genre, index) => (
                                        index === product.genres.length - 1 ?
                                            <span key={index}>{genre.name} </span>
                                            :
                                            <span key={index}>{genre.name}, </span>
                                    ))}

                                </td>
                                <td className="px-6 py-4">
                                    {!product.used ? <div className='inline'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 inline -mt-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg><span>&nbsp;&nbsp;New</span></div>

                                        : <div className='inline'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="crimson" className="w-6 h-6 inline -mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg><span>&nbsp;&nbsp;Used</span></div>
                                    }
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default OrdersTab;