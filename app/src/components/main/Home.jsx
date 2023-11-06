import Navbar from "../navigation/Navbar";
import React, { useState } from "react";
import { Popup } from "./Popup";
import Item from "../product/Item";
import { HeroSection } from "./Hero";
import { Card } from "../cards/Card";
import { Footer } from "../footer/Footer";

export default function Home() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const openPopup = (data) => {
    setOpen(true);
    setData(data);
  };

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white min-h-screen pb-2">
      {open ? <Popup data={data} closePopup={() => setOpen(false)} /> : <></>}
      <Navbar />

      <HeroSection />

      <section className="mt-20 md:mt-40 mb-20">

        {/* !-- Section Container */}
        <div className="flex justify-center items-center flex-col md:flex-row md:space-x-12 md:space-y-0 space-y-12 mx-10">
          <Card year={1970} title={"boards"} hyperlink={"/products/1970"} hyperlinkText={"Explore"} />
          <Card year={2010} title={"boards"} hyperlink={"/products/2010"} hyperlinkText={"Explore"} />
          <Card year={2020} title={"boards"} hyperlink={"/products/2020"} hyperlinkText={"Explore"} />
        </div>
      </section>

      
      <section className="mx-6 md:mx-32">
        <div className="flex flex-col items-center space-y-3 text-center p-7 md:p-2 md:pt-8 mt-16 bg-slate-800 rounded-t-xl">
          <h1 className="font-bold text-3xl">Best seller grocery near you</h1>
          <p className="text-xl">We provide best quality &amp; fresh items near your location</p>
        </div>

         {/*  Items Container  */}
        <div className="dark:bg-slate-800 flex flex-col p-8 md:-mt-4 rounded-b-xl bg-gray-50 md:flex-row md:space-y-0 md:space-x-10 md:p-16">

          {/* // Grid Container */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">

            <Item data={{ name: "Name1", val: 5 }} openPopup={openPopup} />
            <Item data={{ name: "Name2", val: 10.1 }} openPopup={openPopup} />
          </div>
        </div>
      </section> 

      {/* Footer */}
      <section className="mt-20 mb-1">
        <Footer />
      </section>
    </main>
  );
}


