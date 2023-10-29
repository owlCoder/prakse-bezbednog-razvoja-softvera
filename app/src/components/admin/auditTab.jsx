import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

const AuditLog = () => {
    return (
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
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-1 border-b-gray-950 dark:bg-gray-900 dark:border-gray-700">
                            <td class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                            </td>
                            <td class="px-6 py-4 flex">
                                <FaInfoCircle className='inline mr-2 text-primary-400' /> 
                                
                                <FaExclamationTriangle className='inline mr-2 text-yellow-500' /> 

                                <span className='inline mr-2 text-rose-700 text-xl'></span>
                                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AuditLog;
