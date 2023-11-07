import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Item from "../product/Item";
import { Popup } from "../main/Popup";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import LoadingSpinner from "../loading/loading";

function Store() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [popupData, setPopupData] = useState([]);

  const openPopup = (data) => {
    setOpen(true);
    setPopupData(data);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          global.APIEndpoint + "/api/product/get",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setData(response.data.payload);
        }

        setLoading(false);
      } catch (error) {
        navigate("/403");
      }
    };

    fetchData();
  }, [navigate]);

  return loading === true ? (
    <LoadingSpinner />
  ) : data != null ? (
    <div className="bg-gray-100 dark:bg-slate-800 dark:text-white min-h-screen pb-5">
      {open ? (
        <Popup data={popupData} closePopup={() => setOpen(false)} />
      ) : (
        <div></div>
      )}
      <Navbar />
      <div className="min-h-screen mt-20">
        <section>
          {/* Heading */}
          <div className="flex flex-col items-center space-y-3 text-center p-2 pt-10 mt-16">
            <h1 className="font-bold text-3xl">All products</h1>
            <p className="text-xl">
              We provide best quality &amp; fresh items near your location
            </p>
          </div>

          {/* Items Container */}
          <div className="dark:bg-slate-800 flex flex-col p-6 m-3 bg-gray-50 rounded-2xl md:rounded-none md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
            {/* Grid Container */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">
              {data.map((product, index) => (
                <Item key={index} product={product} openPopup={openPopup} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Store;
