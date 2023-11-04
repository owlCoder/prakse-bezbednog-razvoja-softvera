import Navbar from "../navigation/Navbar";

import React, { useState, useRef } from "react";
import { Popup } from "./Popup";
import Item from "../product/Item"; 

export default function Home() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const openPopup = (data) => {
    setOpen(true);
    setData(data);
  };

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white min-h-screen pb-10"> 
      {open ? <Popup data={data} closePopup={() => setOpen(false)} /> : <div></div>}
      <Navbar />

      <section>
        {/* Heading */}
        <div className="flex flex-col items-center space-y-3 text-center p-2 mt-16">
          <h1 className="font-bold text-3xl">Best seller grocery near you</h1>
          <p className="text-xl">We provide best quality &amp; fresh items near your location</p>
        </div>

        {/* Items Container */}
        <div className="dark:bg-slate-700 flex flex-col p-6 m-3 bg-gray-50 rounded-2xl md:rounded-none shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">

          {/* Grid Container */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">

            <Item data={{name: "Name1", val: 5}} openPopup={openPopup} />
            <Item data={{name: "Name2", val: 10.1}} openPopup={openPopup} />
                
          </div>
        </div>
      </section>

      <section className="mt-10">
          
        {/* !-- Section Container */}
        <div className="flex justify-center items-center flex-col md:flex-row md:space-x-12 md:space-y-0 space-y-12 mx-10"> 

          {/* Card */}
          <div className="relative rounded-2xl overflow-hidden">
            
            {/* Image div */}
            <div className="bg-blue-500">
              <img className="" src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" />
            </div>
            
            {/* Text div */}
            <div className="max-size-sm absolute bottom-10 left-0 lg:right-1/4 right-0 py-6 px-3 text-black bg-white bg-opacity-70 dark:bg-slate-900 bg dark:bg-opacity-90 dark:text-white lg:rounded-r-2xl rounded-none">
              <div className="flex justify-between w-full">
                  <div className="font-normal flex flex-col items-start space-y-3">
                    <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                        Lorem, ipsum.
                    </div>
                    <div className="flex flex-col items-start space-y-4 ">
                      <p className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-3xl">Abstract Painting</p>
                      <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Shop now
                      </a>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div> 

          {/* Card */}
          <div className="relative rounded-2xl overflow-hidden">
            
            {/* Image div */}
            <div className="bg-blue-500">
              <img className="" src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" />
            </div>
            
            {/* Text div */}
            <div className="max-size-sm absolute bottom-10 left-0 lg:right-1/4 right-0 py-6 px-3 text-black bg-white bg-opacity-70 dark:bg-slate-900 bg dark:bg-opacity-90 dark:text-white lg:rounded-r-2xl rounded-none">
              <div className="flex justify-between w-full">
                  <div className="font-normal flex flex-col items-start space-y-3">
                    <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                        Lorem, ipsum.
                    </div>
                    <div className="flex flex-col items-start space-y-3 ">
                      <p className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-3xl">Abstract Painting</p>
                      <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Shop now
                      </a>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div> 

          {/* Card */}
          <div className="relative rounded-2xl overflow-hidden">
            
            {/* Image div */}
            <div className="bg-blue-500">
              <img className="" src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" />
            </div>
            
            {/* Text div */}
            <div className="max-size-sm absolute bottom-10 left-0 lg:right-1/4 right-0 py-6 px-3 text-black bg-white bg-opacity-70 dark:bg-slate-900 bg dark:bg-opacity-90 dark:text-white lg:rounded-r-2xl rounded-none">
              <div className="flex justify-between w-full">
                  <div className="font-normal flex flex-col items-start space-y-3">
                    <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                        Lorem, ipsum.
                    </div>
                    <div className="flex flex-col items-start space-y-3 ">
                      <p className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-3xl">Abstract Painting</p>
                      <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Shop now
                      </a>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div>           

        </div>


      </section>
      
    </main>
  );
}


