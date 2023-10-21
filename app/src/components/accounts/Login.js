import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [currentUser, navigate]);

  // funkcija za hendl
  async function handleFormSubmit(e) {
    e.preventDefault();

    setLoading(true);
    let res = JSON.parse(await login(email, password));
    setResponse(res["response"]);
    setLoading(false);
    if (res && res["response"] === "OK") {
      navigate("/");
    }
  }

  return (

    <section className="flex flex-col md:flex-row h-screen items-center bg-gray-900 text-white">

      <div className="dark:bg-gray-900 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-full dark md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" onSubmit={handleFormSubmit}>
            <div>
              <label className="block">Email Address</label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete="email" required />
            </div>

            <div className="mt-4">
              <label className="block">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
            <h4 className="text-red-700 mt-4 mb-5">{response}</h4>
          </div>
            <div className="text-right mb-5">
              <a href="#" className="text-sm font-semibold text-blue-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full block bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">{loading ? <div><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg></div> : ""}
                Log In</button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">Need an account? <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">Create an
            account</a></p>


        </div>
      </div>

    </section>
  );
}