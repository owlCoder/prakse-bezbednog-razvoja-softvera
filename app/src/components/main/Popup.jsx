import { React, useState } from "react";

export const Popup = ({ data, closePopup }) => {

    const [counter, setCounter] = useState(0);

    const handleClick = (button) => {
        if(button.target.id == 'minus' && counter > 0)
            setCounter(counter - 1);        
        else if(button.target.id == 'plus')
            setCounter(counter + 1);
        
    };

  return (
    
    <div className="z-50 fixed inset-0 flex items-center justify-center min-h-screen text-black dark:text-gray-300 backdrop-blur-md backdrop-filter dark:backdrop-blur-md dark:backdrop-filter mb-16 mt-12 md:mt-6">
        {/* Card Container */}
        <div className="relative flex flex-col p-6 m-3 space-y-10 border-2 border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16 mb-16">
            
            {/* Close Button Inside Card Container */}
            <button className="absolute top-6 right-9 p-2 hover:text-gray-500" onClick={closePopup}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>           
            
            {/* Image Div */}
            <div className="flex items-center justify-center">
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

                {/* Button & Number Input */}
                <div className="flex items-center justify-start space-x-5">
                   
                    {/* Number Input */}
                    <div class="custom-number-input h-10 w-32">
                        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                            <button id="minus" onClick={handleClick} className="pb-1 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                <span className="m-auto text-2xl font-thin">-</span>
                            </button>
                            <input type="number" value={counter} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  " name="custom-input-number"/>
                            <button id="plus" onClick={handleClick} data-action="increment" className="pb-1 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                    </div>

                    <button className="h-10 text-white text-sm bg-primary-700 hover:bg-primary-800 focus-ring-4 focus-ring-primary-300 font-medium rounded-lg px-9 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-ring-primary-800" type="button">
                        Buy
                    </button>


                </div>

            </div>
        </div>
    </div>
  );
};