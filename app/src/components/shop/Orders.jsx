import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import LoadingSpinner from "../loading/loading";

function Orders() {
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
               
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default Orders;