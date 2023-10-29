import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const AuditLog = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date');
    const [ascDesc, setAscDesc] = useState(true);

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
                    global.APIEndpoint + '/api/audit/get',
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
        setSortBy(key);
        setAscDesc(!ascDesc); // sort asc and on next click sort desc
    };

    const sortedData = data
        ? data.sort((a, b) => {
            if (sortBy === 'date') {
                if (ascDesc) return b.date._seconds - a.date._seconds; // ascending
                return a.date._seconds - b.date._seconds; // descending
            } else {
                if (ascDesc) return a.messageType.localeCompare(b.messageType); // ascending
                return b.messageType.localeCompare(a.messageType); // descending
            }
        })
        : null;

    return loading === true ? (
        <LoadingSpinner />
    ) : data !== null ? (
        <div className="p-4 bg-white dark:bg-slate-800 bg-opacity-60 rounded-lg shadow-lg mx-6 my-4">
            <p className="text-gray-700 dark:text-gray-200 mb-6 ml-1 my-2 text-center font-medium" style={{ fontSize: 17.5 }}>
                The audit log contains a record of different types of messages, including information messages, warning messages, and error messages, along with their timestamps. <br />
            </p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                <table className="w-full text-md text-left text-black dark:text-white">
                    <thead className="text-md text-white uppercase bg-primary-900 opacity-80">
                        <tr>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortBy('date')}>
                                Evidence Time{' '}
                                {(ascDesc ? <FiArrowUp className='inline' /> : <FiArrowDown className='inline' />)}
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortBy('messageType')}>
                                Type{' '}
                                {(ascDesc ? <FiArrowUp className='inline' /> : <FiArrowDown className='inline' />)}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((audit) => (
                            <tr
                                className="bg-white border-1 border-b-gray-950 dark:bg-gray-900 dark:border-gray-700"
                                key={audit.date._seconds + audit.date._nanoseconds}
                            >
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* Date */}
                                    {new Intl.DateTimeFormat('en-GB').format(new Date(audit.date._seconds * 1000)).toString().replaceAll('/', '.')}
                                </td>
                                <td className="px-6 py-4">
                                    {audit.messageType === 'INFO' ? (
                                        <p style={{ fontSize: 19 }} className="text-primary-500 font-medium">
                                            Informative
                                        </p>
                                    ) : audit.messageType === 'WARNING' ? (
                                        <p style={{ fontSize: 19 }} className="text-yellow-600 font-medium">
                                            Warning
                                        </p>
                                    ) : (
                                        <p style={{ fontSize: 19 }} className="text-red-700 font-medium">
                                            Error
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4">{audit.message}</td>
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

export default AuditLog;
