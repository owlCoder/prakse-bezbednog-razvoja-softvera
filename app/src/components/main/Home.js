import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Login from "../accounts/Login";

export default function Home() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />

      {/*<!-- Global Container -->*/}
      <div className="flex justify-center flex-col md:space-y-2 items-center min-h-screen bg-gray-900 mt-16">

        {/*<!-- Card Container -->*/}
        <div className="flex md:flex-row flex-col items-center w-4/5 max-w-5xl m-6 p-8 dark:border-gray-200 dark:bg-gray-700 dark:text-white shadow-sm rounded-2xl md:space-y-0 md:m-0 md:mt-4">
            
          {/*<!-- Left Side -->*/}
          <div className="">
            <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" className="h-96 w-96" />
          </div>          

          {/*<!-- Right Side -->*/}
          <div className="p-6 md:p-20 flex flex-col space-y-6">
            
            <div className="">
              <p>sifra</p>
              <h1 className="text-3xl font-bold">Shop Item Template</h1>
              <p>$cena</p>          
            </div>

            <div className="m">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia odio voluptatem fugit asperiores fuga quae alias, repellendus reprehenderit magnam modi iure porro est temporibus corporis sed dignissimos nesciunt doloribus ullam ab aliquam placeat? Expedita provident rerum reprehenderit eius atque, quod adipisci eveniet dolorum tempore exercitationem blanditiis ab tempora corporis.</p>
            </div>

            <div className="flex flex-row items-center space-y-2 md:space-y-0 space-x-2">
              <input type="number" className="text-center border border-strong w-16 h-12 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0"/>
              <div className="">
                <a href="#" class="p-3 px-8 rounded-md shadow-lg duration-200 hover:opacity-80 border border-strong">
                  Add to cart
                </a>
              </div>
            </div>

          </div>
        </div>

        {/*<!-- Card Container -->*/}
        <div className="flex md:flex-row flex-col items-center w-4/5 max-w-5xl m-6 p-8 dark:border-gray-200 dark:bg-gray-700 dark:text-white shadow-sm rounded-2xl md:space-y-0 md:m-0 md:mt-4">
            
          {/*<!-- Left Side -->*/}
          <div className="">
            <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" className="h-96 w-96" />
          </div>          

          {/*<!-- Right Side -->*/}
          <div className="p-6 md:p-20 flex flex-col space-y-6">
            
            <div className="">
              <p>sifra</p>
              <h1 className="text-3xl font-bold">Shop Item Template</h1>
              <p>$cena</p>          
            </div>

            <div className="m">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia odio voluptatem fugit asperiores fuga quae alias, repellendus reprehenderit magnam modi iure porro est temporibus corporis sed dignissimos nesciunt doloribus ullam ab aliquam placeat? Expedita provident rerum reprehenderit eius atque, quod adipisci eveniet dolorum tempore exercitationem blanditiis ab tempora corporis.</p>
            </div>

            <div className="flex flex-row items-center space-y-2 md:space-y-0 space-x-2">
              <input type="number" className="text-center border border-strong w-16 h-12 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0"/>
              <div className="">
                <a href="#" class="p-3 px-8 rounded-md shadow-lg duration-200 hover:opacity-80 border border-strong">
                  Add to cart
                </a>
              </div>
            </div>

          </div>
        </div>

        
      </div>
    </main>
  );
}
