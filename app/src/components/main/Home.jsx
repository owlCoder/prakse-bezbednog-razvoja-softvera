import Navbar from "../navigation/Navbar";
import React, { useEffect, useState } from "react";
import { Popup } from "./Popup";
import { HeroSection } from "./Hero";
import { Card } from "../cards/Card";
import { Footer } from "../footer/Footer";
import { getProducts } from '../../services/main';
import { countGenres } from "../../utils/product-counter";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProducts();

      if (response.status === 200) {
        const products = response.data.payload;
        const sortedGenres = countGenres(products);

        setGenres(sortedGenres);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white min-h-screen pb-2">
      {open ? <Popup data={data} closePopup={() => setOpen(false)} /> : <></>}
      <Navbar />

      <div className="pt-10 md:pt-0">
        <HeroSection />
      </div>

      <section className="mt-20 md:mt-40 mb-20">
        {!loading && genres.length >= 3 && (
          <div className="flex justify-center items-center flex-col md:flex-row md:space-x-12 md:space-y-0 space-y-12 mx-10">
            {genres.slice(0, 3).map((genreItem, index) => (
              <Card
                key={index}
                year={genreItem.genre}
                title={`This week ${index === 0 ? 'numero uno' : index === 1 ? 'Silver shines like a gold!' : 'Bronze goes to...'}`}
                hyperlink={`/store?genre=${genreItem.genre}`}
                hyperlinkText="Explore in category"
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-20 mb-1">
        <Footer />
      </section>
    </main>
  );
}