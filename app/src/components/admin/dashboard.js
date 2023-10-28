import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Navbar from "../navigation/Navbar";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, resetPasswordEmailUser } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalDesc, setModalDesc] = useState("");

    function handleChangeFirstName(e) { setFirstName(e.target.value); }
    function handleChangeLastName(e) { setLastName(e.target.value); }
    function handleChangeEmail(e) { setEmail(e.target.value); }
    function handleChangeDate(e) { setDate(e.target.value); }

    // Modal handle functions
    const handleGotItClick = () => {
        setShowModal(false);
    };

    // Function to handle the "Delete Account" button click
    // const handleDeleteAccountClick = async () => {
    //     // Handle the account deletion logic here
    //     try {
    //         const token = await currentUser.getIdToken();
    //         const response = await axios.post(
    //             global.APIEndpoint + "/api/user/delete",
    //             {
    //                 uid: currentUser.uid,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         if(response.status !== 200) 
    //             navigate('/' + response.status.toString());

    //         // Close the modal after successful deletion
    //         setIsModalVisible(false);

    //         // show info modal that account is deleted
    //         setModalText("Account has been deleted");
    //         setModalDesc("Account and all data has been removed. You'll be logged out now.");
    //         setShowModal(true);

    //         // log out
    //         setTimeout(() => {
    //             signOut();
    //         }, 5000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // Function to check if user selected new picture from own library
    const handleEditAccountClick = async (e) => {
        // to do
    };

    // Function to upload new image to firestore
    const createAccountClick = async () => {
        // to do
    };

    const handlePasswordReset = (reqEmail) => {
        resetPasswordEmailUser(reqEmail);
        setModalText("Email has been sent");
        setModalDesc("Notify " + reqEmail + " to check your email for further instructions.");
        setShowModal(true);
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(true);
    };

    // const handleSave = async () => {
    //     try {
    //         const token = await currentUser.getIdToken();
    //         const response = await axios.post(
    //             global.APIEndpoint + "/api/user/update",
    //             {
    //                 uid: currentUser.uid,
    //                 firstName: `${firstName}`,
    //                 lastName: `${lastName}`,
    //                 date: `${date}`,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         if(response.status !== 200) 
    //             navigate('/' + response.status.toString());

    //         setSelectedImage(null);

    //         setModalText("Information updated");
    //         setModalDesc("Profile information has been saved.");
    //         setShowModal(true);
    //     } catch (error) {
    //         navigate('400');
    //     }

    //     setIsEditing(false);
    //     // Here, you can add code to save the edited values using an API request.
    //     // You may also want to add validation and error handling.
    // };

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
                    global.APIEndpoint + "/api/user/getById",
                    {
                        uid: currentUser.uid,
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
              
                if(response.status !== 200 || response.data.payload.role !== "admin") 
                    navigate('/403');
            } catch (error) {
                navigate('/403')
            }

            try {
                // const token = await currentUser.getIdToken();
                // const response = await axios.post(
                //     global.APIEndpoint + "/api/user/get",
                //     {
                //         uid: currentUser.uid
                //     },
                //     {
                //         headers: {
                //             Authorization: `${token}`,
                //             "Content-Type": "application/json",
                //         },
                //     }
                // );

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
        };

        fetchData();
    }, [currentUser, navigate]);

    return loading === true ? (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
            className="bg-white dark:bg-gray-900"
        >
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    border: "6px solid transparent",
                    borderTop: "6px solid #124191",
                    borderRadius: "50%",
                    animation: "spin 2s linear infinite",
                }}
            ></div>
        </div>
    ) : data != null && currentUser ? (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Navbar />

            {/* if collection is users
            <ul className="mt-32">
                {data.map((item) => (
                    <li key={item.uid} className="text-white">
                        <h2>{item.firstName} {item.lastName} {item.email}</h2>
                    </li>
                ))}
            </ul> */}

            <ul className="mt-32 ml-32">
                {data.map((item) => (
                    <li className="text-white">
                        <h1>[{new Date(item.date._seconds*1000).toUTCString()}] {item.messageType} {item.message}</h1>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div></div>
    );
}
