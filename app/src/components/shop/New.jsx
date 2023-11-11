import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import Navbar from "../navigation/Navbar";
import LoadingSpinner from "../loading/loading";
import 'flowbite';

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

            <div className="flex justify-center items-center mt-32 mx-12 pb-6">
                <div className="dark:text-white dark:bg-gray-800 max-w-7xl rounded-2xl p-12 pt-6 shadow-2xl">
                    
                    { /* Title */}
                    <div className="pt-6 pb-10 text-center">
                        <p className="text-5xl mb-6">Add new Product</p>
                    </div>                    

                    <form action="">

                        <div className="flex flex-col max-w-6xl  md:flex-row space-y-3 md:space-x-24 md:space-y-0">
                            {/* Image */}
                            <div className="overflow-hidden rounded-xl h-fit max-w-xs">
                                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" className="hover:scale-105 duration duration-300"/>
                            </div>

                            {/* Info about Product */}
                            <div className="flex flex-col space-y-5">
                                
                                {/* Title */}
                                <div className="dark:text-white text-black text-2xl">
                                    <p className="">Product Info</p>
                                </div>

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Name:</label>
                                    <input type="text" className="w-80 p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Author:</label>
                                    <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Year of Production:</label>
                                    <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-2 justify-start">
                                    <label htmlFor="">Genres:</label>
                                    
                                    <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>

                                    { /* Dropdown menu */}
                                    <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                        <div class="p-3">
                                            <label for="input-group-search" class="sr-only">Search</label>
                                            <div class="relative">
                                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                    </svg>
                                                </div>
                                                <input type="text" id="input-group-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
                                            </div>
                                        </div>

                                        <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input checked id="checkbox-item-12" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="checkbox-item-12" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input id="checkbox-item-13" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="checkbox-item-13" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Michael Gough</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-14" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="checkbox-item-14" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Robert Wall</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-15" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="checkbox-item-15" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Joseph Mcfall</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-16" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="checkbox-item-16" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Leslie Livingston</label>
                                                </div>
                                            </li>
                                                    <li>
                                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-17" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="checkbox-item-17" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Roberta Casas</label>
                                                </div>
                                            </li>
                                        </ul>
                                        <a href="#" class="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
                                            </svg>
                                            Delete user
                                        </a>
                                    </div>
                                </div>
                                    
                            </div>

                            {/* Info about Order */}
                            <div className="flex flex-col space-y-5">

                                {/* Title */}
                                <div className="dark:text-white text-black text-2xl">
                                    <p className="">Order Info</p>
                                </div>                                

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Price:</label>
                                    <input type="text" className="w-80 p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>                        

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Quantity:</label>
                                    <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-2 justify-center">
                                    <label htmlFor="">Available untill:</label>
                                    <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-2 justify-start">
                                    <div class="flex">
                                        <label className="mr-6">Used? </label>
                                        
                                        <div class="flex items-center me-4">
                                            <input id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="inline-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 1</label>
                                        </div>
                                        <div class="flex items-center me-4">
                                            <input id="inline-2-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="inline-2-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                                        </div>                                                                                
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                        
                    </form>

                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default New;