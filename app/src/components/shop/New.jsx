import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import Navbar from "../navigation/Navbar";
import LoadingSpinner from "../loading/loading";

function New() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (!currentUser) {
                navigate("/login");
                return;
            }

            setLoading(false);
        };

        fetchData();
    }, [currentUser, navigate]);

    return loading === true ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-5">
            <Navbar />
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen mt-20"> 
                <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0bg-opacity-75 transition-opacity" aria-hidden="true" />
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom dark:bg-gray-800 dark:text-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-slate-50 dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
                                    Create a new account
                                </h3>
                                <div className="mt-6">
                                    <div className="mb-4 flex space-x-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"
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
                                            className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-4 mt-4">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                minLength={6}
                                                required
                                                className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Add similar input fields for other account details, e.g., lastName, email, password */}
                                    <div className="mt-6">
                                        <button
                                            className="px-4 py-2 bg-sky-800 text-white font-medium hover:bg-sky-700 rounded-lg"
                                        >
                                            <AiOutlineUserAdd className="plus-icon inline -mt-1" />
                                            Create Account
                                        </button>

                                        <button
                                            className="px-4 py-2 bg-red-800 text-white rounded-lg font-medium hover:bg-red-900 ml-4"
                                        >
                                            <AiOutlineClose className="plus-icon inline -mt-0.5" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default New;