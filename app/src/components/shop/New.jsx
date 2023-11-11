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

            <div className="flex justify-center items-center mt-32 pb-6">
                <div className="dark:text-white dark:bg-gray-800 rounded-2xl p-12 pt-6 shadow-2xl flex flex-col items-end space-y-10">
                    
                    {/* All Content */}
                    <div className="">
                    
                        { /* Title */}
                        <div className="pt-6 pb-10 text-center">
                            <p className="text-5xl mb-6">Add new Product</p>
                        </div>                    

                        <form action="">
                            <div className="flex flex-col lg:flex-row lg:space-x-24 space-y-12 lg:space-y-0 lg:divide-none divide-y dark:divide-gray-200">
                        
                                {/* Image */}
                                <div className="flex flex-col space-y-3 justify-center">                                    
                                    <div className="overflow-hidden rounded-lg mx-auto">
                                        <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" className="hover:scale-105 duration duration-300 w-44"/>
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                            Profile picture
                                        </h3>
                                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                            JPG or PNG. Max file size of 800Kb
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="mr-2">
                                                <input type="file" accept="image/*" id="imageInput" style={{display: "none"}} />
                                                <label htmlFor="imageInput" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800" style={{cursor: "pointer"}}>
                                                    Select an Image
                                                </label>
                                            </div>
                                            <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                                </svg>
                                                Upload
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                {/* Info about Product */}
                                <div className="flex flex-col space-y-5 ">
                                    
                                    {/* Title */}
                                    <div className="dark:text-white text-black text-2xl mt-6">
                                        <p className="">Product Info</p>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Name:</label>
                                        <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Author:</label>
                                        <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Year of Production:</label>
                                        <input type="date" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    
                                    <div className="flex items-center space-x-4">
                                        <label htmlFor="">Genres:</label>
                                        
                                        <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="mx-auto inline-flex items-center  px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                            </svg>
                                        </button>
                                    </div>
                                    

                                    { /* Dropdown menu */}
                                    <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                        <div className="p-3">
                                            <label htmlFor="input-group-search" className="sr-only">Search</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                    </svg>
                                                </div>
                                                <input type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
                                            </div>
                                        </div>

                                        <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="checkbox-item-11" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input checked id="checkbox-item-12" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="checkbox-item-12" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input id="checkbox-item-13" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="checkbox-item-13" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Michael Gough</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-14" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="checkbox-item-14" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Robert Wall</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-15" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="checkbox-item-15" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Joseph Mcfall</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-16" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="checkbox-item-16" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Leslie Livingston</label>
                                                </div>
                                            </li>
                                                    <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="checkbox-item-17" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="checkbox-item-17" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Roberta Casas</label>
                                                </div>
                                            </li>
                                        </ul>
                                        <a href="#" className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
                                            </svg>
                                            Delete user
                                        </a>
                                    </div>                                    
                                        
                                </div>

                                {/* Info about Order */}
                                <div className="flex flex-col space-y-5">

                                    {/* Title */}
                                    <div className="dark:text-white text-black text-2xl mt-6">
                                        <p className="">Order Info</p>
                                    </div>                                

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Price:</label>
                                        <input type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                    </div>                        

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Quantity:</label>
                                        <input type="number" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Available untill:</label>
                                        <input type="date" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-start">
                                        <div className="flex">
                                            <label className="mr-6">Used? </label>
                                            
                                            <div className="flex items-center me-4">
                                                <input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="inline-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">New</label>
                                            </div>
                                            <div className="flex items-center me-4">
                                                <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="inline-2-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Used</label>
                                            </div>                                                                                
                                        </div>
                                    </div>
                                        
                                </div>
                            </div>    
                        </form>
                    </div>

                    <div className="">
                        <button type="button" className="mx-auto inline-flex items-center px-6 py-2 text-lg font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="plus-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
                            </svg>
                            Add
                        </button>
                    </div>
                                        

                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default New;