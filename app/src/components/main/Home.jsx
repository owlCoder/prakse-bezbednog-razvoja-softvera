import Navbar from "../navigation/Navbar";
import React, { useState } from "react";
import { Popup } from "./Popup";
import Item from "../product/Item";
import { HeroSection } from "./Hero";

export default function Home() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const openPopup = (data) => {
    setOpen(true);
    setData(data);
  };

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white min-h-screen pb-2">
      {open ? <Popup data={data} closePopup={() => setOpen(false)} /> : <div></div>}
      <Navbar />
      <HeroSection />
      
      <section>
        {/* Heading */}
        <div className="flex flex-col items-center space-y-3 text-center p-2 mt-16 bg-gray-700">
          <h1 className="font-bold text-3xl">Best seller grocery near you</h1>
          <p className="text-xl">We provide best quality &amp; fresh items near your location</p>
        </div>

        {/* Items Container */}
        <div className="dark:bg-gray-700 flex flex-col p-6 m-3 bg-gray-50 rounded-2xl md:rounded-none shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">

          {/* Grid Container */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">

            <Item data={{ name: "Name1", val: 5 }} openPopup={openPopup} />
            <Item data={{ name: "Name2", val: 10.1 }} openPopup={openPopup} />

          </div>
        </div>
      </section>

    </main>
  );
}


