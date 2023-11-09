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

            <div className="mt-24 pb-6"></div>
                <div className="dark:text-white dark:bg-gray-800 mx-12 rounded-2xl p-6 pb-16 shadow-2xl">
                    
                    <p className="text-4xl p-6 mb-6">Add new Product</p>
                    <form action="">

                        <div className="flex flex-col md:flex-row space-y-3 md:space-x-24 md:space-y-0">
                            {/* Image */}
                            <div className="overflow-hidden rounded-lg">
                                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" className="hover:scale-105 w-full duration duration-300 max-w-sm"/>
                            </div>

                            {/* Other Info */}
                            <grid className="grid grid-cols-3 gap-16">
                                <div className="flex flex-col space-y-3 justify-center">
                                    <label htmlFor="">Name:</label>
                                    <input type="text" class="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-3 justify-center">
                                    <label htmlFor="">Author:</label>
                                    <input type="text" class="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-3 justify-center">
                                    <label htmlFor="">Year:</label>
                                    <input type="text" class="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>

                                <div className="flex flex-col space-y-3 justify-start">
                                    <label htmlFor="">Price:</label>
                                    <input type="text" class="w-full p-2 bg-white border-primary-800 dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md outline-none"></input>
                                </div>
                                    
                            </grid>
                        </div>
                        
                    </form>

                </div>
            </div>
    ) : (
        <div></div>
    );
}

export default New;