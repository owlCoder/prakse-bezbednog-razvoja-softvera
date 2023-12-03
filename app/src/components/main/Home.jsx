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

      <div className="pt-10 md:pt-0">
        <HeroSection />
      </div>
      

      <section className="mt-20 md:mt-40 mb-20">

        {/* !-- Section Container */}
        <div className="flex justify-center items-center flex-col md:flex-row md:space-x-12 md:space-y-0 space-y-12 mx-10">
          <Card year={1970} title={"boards"} hyperlink={"/products/1970"} hyperlinkText={"Explore"} />
          <Card year={2010} title={"boards"} hyperlink={"/products/2010"} hyperlinkText={"Explore"} />
          <Card year={2020} title={"boards"} hyperlink={"/products/2020"} hyperlinkText={"Explore"} />
        </div>
      </section>

      {/* Footer */}
      <section className="mt-20 mb-1">
        <Footer />
      </section>
    </main>
  );
}


