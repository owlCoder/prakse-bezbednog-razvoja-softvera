import Navbar from "../navigation/Navbar";

export default function Home() {

  return (
    <main className="dark:bg-gray-900 bg-gray-100 dark:text-white h-screen"> 
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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
              <a href="#" class="flex justify-between p-2 bg-primary-700 px-5 rounded-lg hover:bg-primary-800 font-medium text-white text-md">
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

                
          </div>
        </div>
      </section>
      
    </main>
  );
}


