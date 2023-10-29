import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import LoadingSpinner from '../loading/loading';

const AuditLog = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            if (!currentUser) {
                navigate("/login");
                return;
            }

            try {
                const token = await currentUser.getIdToken();
                const response = await axios.post(
                    global.APIEndpoint + "/api/audit/get",
                    {
                        uid: currentUser.uid
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setData(response.data.payload);
                setLoading(false);

                if (response.status !== 200)
                    navigate('/' + response.status.toString());
            } catch (error) {
                navigate('/403')
            }
        }

        fetchData();
    }, [currentUser, navigate]);

    return loading === true ? (
        <LoadingSpinner />
    ) : data !== null(
        <div className="p-4 bg-white dark:bg-slate-800 bg-opacity-60 rounded-lg shadow-lg mx-6 my-4">
            <p className="text-gray-700 dark:text-gray-200 mb-6 ml-1 my-2 text-center font-medium" style={{ fontSize: 17.5 }}>
                The audit log contains a record of different types of messages, including information messages, warning messages, and error messages, along with their timestamps. <br />
            </p>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                <table class="w-full text-md text-left text-black dark:text-white">
                    <thead class="text-md text-white uppercase bg-primary-900 opacity-80">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Evidence Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-1 border-b-gray-950 dark:bg-gray-900 dark:border-gray-700">
                            <td class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </td>
                            <td class="px-6 py-4">
                                <p style={{ fontSize: 19 }} className='text-primary-500 uppercase font-medium'>Informative</p>
                                <p style={{ fontSize: 19 }} className='text-yellow-600 uppercase font-medium'>Warning</p>
                                <p style={{ fontSize: 19 }} className='text-red-700 uppercase font-medium'>Error</p>
                            </td>
                            <td class="px-6 py-4">
                                Laptop
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>)
};

export default AuditLog;
