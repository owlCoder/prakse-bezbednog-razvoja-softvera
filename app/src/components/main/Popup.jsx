import React from "react";

export const Popup = ({ data, closePopup }) => {

  return (
    
    <div className="fixed inset-0 flex items-center justify-center min-h-screen text-black backdrop-blur-md backdrop-filter dark:backdrop-blur-md dark:backdrop-filter mb-16 mt-12 md:mt-6">
        {/* Card Container */}
        <div className="relative flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16 mb-16">
            
            {/* Close Button Inside Card Container */}
            <button className="absolute top-6 right-9 p-2 text-gray-500 hover:text-gray-800" onClick={closePopup}>
                Close
            </button>           
            
            {/* Image Div */}
            <div>
                <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" className="mx-auto duration-200 w-60 hover:scale-105"/>
            </div>

            {/* Content */}
            <div className="flex flex-col space-y-6 text-center">                
                {/* Label, Title & Price Container */}
                <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                    <div>
                        <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                            Lorem, ipsum.
                        </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="max-w-sm text-2xl font-medium">
                            Razer Kraken Kitty Edt Gaming Headset Quartz
                        </div>
                    </div>
                    
                    {/* Price Container */}
                    <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">                
                        <p className="text-4xl font-bold">${data.val}</p>
                        <p className="text-sm font-light text-gray-400">
                        Lorem ipsum dolor sit amet.
                        </p>
                    </div>    

                </div>

                {/* Description */}
                <div className="max-w-xl md:text-left">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia odio voluptatem fugit asperiores fuga quae alias, repellendus reprehenderit magnam modi iure porro est temporibus corporis sed dignissimos nesciunt doloribus ullam ab aliquam placeat? Expedita provident rerum reprehenderit eius atque, quod adipisci eveniet dolorum tempore exercitationem blanditiis ab tempora corporis.</p>
                </div>

                {/* Button */}
                <div className="flex md:flex-row space-y-6 flex-col items-center md:space-y-0 space-x-2">
                    <div className="">
                        <a href="/" className="p-3 px-8 rounded-md shadow-lg duration-200 hover:opacity-80 border border-strong">
                            Add to cart
                        </a>
                    </div>
                </div>

                {/* Stock */}
                <div className="flex items-center space-x-3 group md:items-start">
                    <div className="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping">
                    </div>
                    <div className="text-sm">50+ pcs. in stock</div>
                </div>


            </div>
        </div>
    </div>
  );
};