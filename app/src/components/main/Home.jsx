import Navbar from "../navigation/Navbar";

import React, { useState } from "react";
import { Popup } from "./Popup";

export default function Home() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white min-h-screen"> 
      {open ? <Popup data={data} closePopup={() => setOpen(false)} /> : <div></div>}
      <Navbar />
      <section>
        {/* Heading */}
        <div class="flex flex-col items-center space-y-3 text-center p-2 mt-16">
          <h1 class="font-bold text-3xl">Best seller grocery near you</h1>
          <p class="text-xl">We provide best quality &amp; fresh items near your location</p>
        </div>

        {/* Items Container */}
        <div class="dark:bg-gray-800 flex flex-col p-6 m-3  bg-white rounded-2xl md:rounded-none shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">

          {/* Grid Container */}
          <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Item */}
            <div class="flex flex-col border shadow p-5 space-y-5 max-w-sm rounded-lg">

              {/* Image */}
              <div class="overflow-hidden">
                <img src="https://musicbox.co.rs/images/1.vr7_resize.jpg" alt="" class="hover:scale-105 w-full rounded-lg"/>
              </div>

              {/* Price & Title */}
              <div class="text-left flex flex-col">
                <p class="text-xl line-through">$2.64</p>
                <p class="text-3xl font-bold">$2.64</p>
                <div class="text-xl">
                  Fresh Green Leaf Lettuce
                </div>
              </div>

              {/* Stock */}
              <div class="flex items-center space-x-3 group md:items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">50+ pcs. in stock</div>
              </div>
              
              {/* Button */}
              <div>
                <a href="#" onClick={() => setOpen(true)} class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
                  <div class=""></div>
                  <p>View Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                  </svg>
                </a>                
              </div>              

              {/* Main modal */}
              <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          {/* Modal header */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* Modal body */}
                          <div class="p-6 space-y-6">
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          {/* Modal footer */}
                          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                          </div>
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


