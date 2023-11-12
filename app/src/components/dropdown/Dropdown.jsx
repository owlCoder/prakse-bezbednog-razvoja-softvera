import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {BiMusic} from "react-icons/bi";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="mx-auto inline-flex items-center  px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Options
          <div className="-mr-1 h-5 w-5 text-white flex items-center" aria-hidden="true">
            <svg className=" w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </div>
        </Menu.Button>
      </div>
            
      <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 dark:bg-gray-800 dark:divide-gray-700 ring-black ring-opacity-5 focus:outline-none max-h-2xl">            
            
                <div className="py-1">
                    <Menu.Item>
                        {({ active }) => (
                        <div
                            className={classNames(
                            active
                                ? "bg-gray-100 dark:bg-gray-900 text-gray-900"
                                : "text-gray-700",
                            "block px-4 py-2 text-sm dark:text-gray-300 dark:hover:bg-gray-900"
                            )}
                        >
                            <BiMusic className="icon inline mr-2 dark:text-white" fontSize="1.2rem" /> Placeholder
                        </div>
                        )}
                    </Menu.Item>
                </div>
               
            </Menu.Items>
        </Transition>
    </Menu>
  )
}