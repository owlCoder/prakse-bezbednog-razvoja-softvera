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
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false); // State for showing the create account modal
    const [newAccountData, setNewAccountData] = useState({});
    const [error, setError] = useState("");

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

    // Function to toggle the "Create Account" modal
    const toggleCreateAccountModal = () => {
        setShowCreateAccountModal(!showCreateAccountModal);

        if (showCreateAccountModal === false) {
            setNewAccountData([]);
        }

        setError("");
    };

    // Function to handle input changes for creating a new account
    const handleNewAccountInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccountData({
            ...newAccountData,
            [name]: value,
        });
    };

    // Function to handle the creation of a new account (you can implement this logic)
    const handleCreateAccount = async () => {
        const userProperties = {
            email: newAccountData.email,
            emailVerified: true, // account created by an admin is trusted by admin
            password: newAccountData.password,
            displayName: newAccountData.firstName + ' ' + newAccountData.lastName,
            disabled: false
        };

        const userData = {
            uid: "",
            email: newAccountData.email,
            firstName: newAccountData.firstName,
            lastName: newAccountData.lastName,
            date: newAccountData.birthday,
        };

        try {
            const token = await currentUser.getIdToken();

            // call api to register a new user
            const response = await axios.post(
                global.APIEndpoint + "/api/user/newAccount",
                {
                    uid: currentUser.uid,
                    userProperties: userProperties,
                    userData: userData
                },
                {
                    headers:
                    {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // check api's reponse
            if (response.data.code !== 200)
                setError(response.data.payload);
            else {
                setError("AC");
            }
        }
        catch (error) {
            setError(error.response.data.payload)
        }
    };


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
                {/* Create Account Modal */}
                {showCreateAccountModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0bg-opacity-75 transition-opacity" aria-hidden="true" />
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 dark:text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
                                        Create a new account
                                    </h3>
                                    <div className="mt-6">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={newAccountData.firstName || ''}
                                                onChange={handleNewAccountInputChange}
                                                required
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl outline-none"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={newAccountData.lastName || ''}
                                                onChange={handleNewAccountInputChange}
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl outline-none"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                Birthday
                                            </label>
                                            <input
                                                type="date"
                                                name="birthday"
                                                required
                                                value={newAccountData.birthday || ''}
                                                onChange={handleNewAccountInputChange}
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl outline-none"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={newAccountData.email || ''}
                                                onChange={handleNewAccountInputChange}
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl outline-none"
                                            />
                                            <div className="mb-4 mt-4">
                                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    minLength={6}
                                                    required
                                                    value={newAccountData.password || ''}
                                                    onChange={handleNewAccountInputChange}
                                                    className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-xl outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className='ml-1 text-center'>
                                            {error === "AC" ? <span className='text-green-600'>User account has been created</span> : <span className='text-red-600'>{error}</span>}
                                        </div>
                                        {/* Add similar input fields for other account details, e.g., lastName, email, password */}
                                        <div className="mt-6">
                                            <button
                                                onClick={handleCreateAccount}
                                                className="px-4 py-2 bg-emerald-900 text-white rounded hover:bg-emerald-800"
                                            >
                                                Create Account
                                            </button>

                                            <button
                                                onClick={toggleCreateAccountModal}
                                                className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 ml-4"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-6 mt-2">
                    <button
                        onClick={toggleCreateAccountModal}
                        className="new-ad-button uppercase"
                        style={{fontSize: 16, fontWeight: '500'}}
                    >
                        Create new account
                    </button>
                </div>
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
                                    {!currentUser.disabled ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
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
