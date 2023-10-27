import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Navbar from "../navigation/Navbar";

export default function Profile() {
    const navigate = useNavigate();
    const { currentUser, resetPasswordEmail, signOut } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [date, setDate] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);
    const imageRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalDesc, setModalDesc] = useState("");

    function handleChangeFirstName(e) {
        setFirstName(e.target.value);
    }
    function handleChangeLastName(e) {
        setLastName(e.target.value);
    }
    function handleChangeDate(e) {
        setDate(e.target.value);
    }

    // Modal handle functions
    const handleGotItClick = () => {
        setShowModal(false);
    };

    // Function to handle the "Delete Account" button click
    const handleDeleteAccountClick = async () => {
        // Handle the account deletion logic here
        try {
            const token = await currentUser.getIdToken();
            await axios.post(
                global.APIEndpoint + "/api/user/delete",
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

            // Close the modal after successful deletion
            setIsModalVisible(false);

            // show info modal that account is deleted
            setModalText("Account has been deleted");
            setModalDesc(
                "Account and all data has been removed. You'll be logged out now."
            );
            setShowModal(true);

            ///////////////////////////// MYB not neeeded!!!! ///////////////////////
            // log out
            setTimeout(() => {
                signOut();
            }, 5000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to check if user selected new picture from own library
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setSelectedImage(base64String);
                if (imageRef.current) {
                    imageRef.current.src = base64String;
                }
            };
            reader.readAsDataURL(file);
        } else {
            // no image has been selected
            setSelectedImage(null);
            if (imageRef.current) {
                imageRef.current.src = profilePicture;
            }
        }
    };

    // Function to upload new image to firestore
    const handleNewImage = async () => {
        if (selectedImage != null) {
            try {
                const token = await currentUser.getIdToken();
                await axios.post(
                    global.APIEndpoint + "/api/updatePicture",
                    {
                        uid: currentUser.uid,
                        photoBase64: `${selectedImage}`,
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setSelectedImage(null);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    const handlePasswordReset = () => {
        resetPasswordEmail(currentUser.email);
        setModalText("Email has been sent");
        setModalDesc("Please check your email for further instructions.");
        setShowModal(true);
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(true);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = await currentUser.getIdToken();
            await axios.post(
                global.APIEndpoint + "/api/updateUser",
                {
                    uid: currentUser.uid,
                    firstName: `${firstName}`,
                    lastName: `${lastName}`,
                    date: `${date}`,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSelectedImage(null);

            setModalText("Information updated");
            setModalDesc("Profile information has been saved.");
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setIsEditing(false);
        // Here, you can add code to save the edited values using an API request.
        // You may also want to add validation and error handling.
    };

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
                    global.APIEndpoint + "/api/user",
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

                setData(response.data);
                setFirstName(JSON.parse(response.data).payload.firstName);
                setLastName(JSON.parse(response.data).payload.lastName);
                setDate(JSON.parse(response.data).payload.date);
                setProfilePicture(JSON.parse(response.data).payload.photoBase64);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
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
            {/* Modal for account deletion */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                    <div className="bg-white dark:bg-gray-900 w-96 rounded-lg p-6 shadow-lg transition-opacity duration-300">
                        <h2 className="text-xl font-semibold text-red-600 dark:text-red-700 mb-4">
                            Delete Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete your account? This action cannot
                            be undone.
                        </p>
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={handleDeleteAccountClick}
                                className="bg-red-500 dark:bg-rose-700 text-white font-semibold px-4 py-2 rounded mr-4 hover:bg-rose-800"
                            >
                                I agree to delete my account
                            </button>
                            <button
                                onClick={() => setIsModalVisible(false)}
                                className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover-bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal for password reset */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
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
            <div className="grid grid-cols-1 px-4 pt-8 xl:grid-cols-3 xl:gap-4 bg-gray-100 dark:bg-gray-900 mt-16 md:w-4/5 md:mx-auto">
                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        Personal account
                    </h1>
                </div>
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img
                                ref={imageRef}
                                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                                src={JSON.parse(data).payload.photoBase64}
                                alt=""
                            />
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                    Profile picture
                                </h3>
                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    JPG or PNG. Max file size of 800K
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="mr-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                            id="imageInput"
                                        />
                                        <label
                                            htmlFor="imageInput"
                                            style={{ cursor: "pointer" }}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                                        >
                                            Select an Image
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleNewImage}
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2 -ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                        </svg>
                                        Upload
                                    </button>
                                    {/* <button type="button" className="inline-flex py-2 items-center px-3 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus-ring-red-200 dark:focus-ring-red-700 dark:bg-transparent dark:text-white dark:border-red-600 dark:hover:text-white dark:hover:bg-red-800">
                                        Remove
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full xl:col-auto">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">
                                Account
                            </h3>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Once you delete your account, there is no going back. Please
                                    be certain.
                                </p>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="text-white bg-rose-800 text-sm hover:bg-rose-900 focus-ring-4 focus-ring-rose-900 font-medium rounded-lg px-5 py-2 text-center dark:bg-rose-800 dark:hover:bg-rose-900 dark:focus-ring-rose-800"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            General
                        </h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="first-name"
                                            value={firstName}
                                            onChange={handleChangeFirstName}
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-500 focus-border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-ring-primary-500 dark:focus-border-primary-500"
                                            placeholder="First Name"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {firstName}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="last-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="last-name"
                                            value={lastName}
                                            onChange={handleChangeLastName}
                                            id="last-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-500 focus-border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-ring-primary-500 dark:focus-border-primary-500"
                                            placeholder="Last Name"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {lastName}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="birthday"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Birthday
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="birthday"
                                            value={date}
                                            onChange={handleChangeDate}
                                            min="1950-01-01"
                                            max="2021-01-01"
                                            id="birthday"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-500 focus-border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-ring-primary-500 dark:focus-border-primary-500"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">{date}</p>
                                    )}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {currentUser.email}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {currentUser.email}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-6 sm-col-full -mt-6">
                                    {isEditing ? (
                                        <button
                                            onClick={handleSave}
                                            className="text-white text-sm bg-primary-700 hover:bg-primary-800 focus-ring-4 focus-ring-primary-300 font-medium rounded-lg px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-ring-primary-800 mt-6"
                                            type="button"
                                        >
                                            Update profile
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleEdit}
                                            className="text-white text-sm bg-primary-700 hover:bg-primary-800 focus-ring-4 focus-ring-primary-300 font-medium rounded-lg px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-ring-primary-800 mt-6"
                                            type="button"
                                        >
                                            Edit profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            Password{" "}
                        </h3>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                You can change your password by clicking the button below. We
                                will send you a an email with magic link to change a password.
                            </p>
                            <button
                                onClick={handlePasswordReset} // Add a function to send the password reset email
                                className="text-white bg-primary-700 text-sm focus-ring-4 focus-ring-primary-300 font-medium rounded-lg hover:bg-primary-800 px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-ring-primary-800"
                            >
                                Request password change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}
