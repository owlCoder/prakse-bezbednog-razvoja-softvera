import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import Navbar from "../navigation/Navbar";
import LoadingSpinner from "../loading/loading";
import Dropdown from "../dropdown/Dropdown";

function New() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalDesc, setModalDesc] = useState("");

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


    const handleAddClick = () => {



        setModalText("Product added");
        setModalDesc("New item has been posted.");
        setShowModal(true);    
    };

    const handleGotItClick = () => {
        setShowModal(false);
    };


    return loading === true ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-5">
            <Navbar />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                    <div className="bg-white w-96 rounded-lg p-6 shadow-lg dark:bg-gray-900 transition-opacity duration-300">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {modalText}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">{modalDesc}</p>
                        <button
                            onClick={handleGotItClick}
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded mt-4 hover:bg-blue-600"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center mt-32 pb-6">
                <div className="dark:text-white dark:bg-gray-800 rounded-2xl p-12 px-20 pt-6 shadow-2xl flex flex-col items-end space-y-10">
                    
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
                                        <input type="text" required className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Author:</label>
                                        <input type="text" required className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Year of Production:</label>
                                        <input type="date" required className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    
                                    <div className="flex items-center space-x-4">
                                        <label>Genres:</label>
                                        <Dropdown />
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
                                        <input required type="text" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                    </div>                        

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Quantity:</label>
                                        <input required type="number" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                    </div>

                                    <div className="flex flex-col space-y-2 justify-center">
                                        <label htmlFor="">Available untill:</label>
                                        <input required type="date" className="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                    </div>

                                    
                                    <div className="flex">
                                        <label className="mr-6 mt-2">Used? </label>
                                        
                                        <div className="flex items-center me-4 mt-2">
                                            <input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">New</label>
                                        </div>
                                        <div className="flex items-center me-4 mt-2">
                                            <input id="inline-2-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-2-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Used</label>
                                        </div>                                                                                
                                    </div>
                                    
                                        
                                </div>
                            </div>    
                        </form>
                    </div>

                    <div className="">
                        <button type="button" onClick={handleAddClick} className="mx-auto inline-flex items-center px-6 py-2 text-lg font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="plus-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
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