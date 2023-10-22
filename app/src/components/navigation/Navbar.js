import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const links = ["Homepage", "Ads"];
  const profileLinks = ["Account Settings", "Dashboard"];
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  // greetins messages
  var greetings = [
    "Hello",
    "Ciao",
    "Welcome",
    "Howdy",
    "Greetings",
    "Salut",
    "Hola",
    "Gday",
    "Hey",
  ];

  async function handleSignOut(e) {
    e.preventDefault();
    await signOut();
    navigate("/");
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-50 dark:bg-gray-950 dark:text-white dark:border-gray-700 fixed top-0 w-full border-b-2 border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {links.map((link, index) => (
                    <a
                      href={link.toLowerCase().replaceAll(" ", "-")}
                      key={index}
                      className=" hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium dark:hover:bg-gray-700"
                    >
                      {link}
                    </a>
                  ))}

                  {/* if user is logged in show account menu  */}
                  <div className="absolute right-4 text-base font-normal">
                    {currentUser !== null ? (
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-blue-700 opacity-80 dark:hover:bg-blue-800 dark:ring-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {
                              greetings[
                                Math.floor(Math.random() * greetings.length)
                              ]
                            }
                            , {currentUser.email}
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 dark:bg-gray-800 dark:divide-gray-700 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {profileLinks.map((link, index) => (
                                <Menu.Item key={index}>
                                  {({ active }) => (
                                    <a
                                      href={link
                                        .toLowerCase()
                                        .replaceAll(" ", "-")}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 dark:bg-gray-900 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm dark:text-gray-300 dark:hover:bg-gray-900"
                                      )}
                                    >
                                      {link}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/"
                                    onClick={handleSignOut}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 dark:bg-gray-900 text-red-500"
                                        : "text-red-500 hover:text-red-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Sign Out
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <p>sdsa</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-300 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link, index) => (
                <a
                  href={link.toLowerCase().replaceAll(" ", "-")}
                  key={index}
                  className=" hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium dark:hover:bg-gray-700"
                >
                  {link}
                </a>
              ))}

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white">
                    Options
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {profileLinks.map((link, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <a
                              href={link.toLowerCase().replaceAll(" ", "-")}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {link}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            onClick={handleSignOut}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-red-700"
                                : "text-red-800 hover:text-red-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Sign Out
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Transition>
      </nav>
      <hr className="h-px bg-gray-300 border-0" />
    </div>
  );
}

export default Navbar;
