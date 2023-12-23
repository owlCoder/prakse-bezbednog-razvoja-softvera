import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserById } from "../services/user.js";
import Navbar from "../navigation/Navbar";
import UsersTabs from "../tabs/UsersTab.jsx";
import LoadingSpinner from "../loading/loading";

export default function UserDashboard() {
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

            try {
                const token = await currentUser.getIdToken();
                const response = await getUserById(currentUser, token);

               if(response.status === 200) {
                    setLoading(false);
                }
              
            } catch (error) {
                navigate('/403')
            }
        };

        fetchData();
    }, [currentUser, navigate]);

    return loading === true ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-5">
            <Navbar />
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen mt-20">
                <UsersTabs /> {/* Render the Tabs component here */}
            </div>
        </div>
    ) : (
        <div></div>
    );
}
