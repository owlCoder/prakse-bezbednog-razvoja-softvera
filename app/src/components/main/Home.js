import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../navigation/Navbar";

export default function Home() {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

    }, [currentUser, navigate]);

    async function handleLogout(e) {
        e.preventDefault();
        await signOut();
        navigate("/");
    }

    function handleLogin(e) {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <main>
            <Navbar />
            <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Info</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {currentUser ? "ulogovan" : "jok"}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Super za tebe, nastavi dalje!</p>
                    {currentUser ?
                        <form className="mt-10 flex items-center justify-center gap-x-6">
                            <button type="submit" onClick={handleLogout} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Odjava</button>
                        </form> :
                        <form className="mt-10 flex items-center justify-center gap-x-6" onSubmit={handleLogin}>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Prijava</button>
                        </form>
                    }
                </div>
            </div>
        </main>
    );
}